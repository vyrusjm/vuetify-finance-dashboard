// src/stores/instrumentStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchConstituents, fetchInstrumentDetail, fetchChartData, fetchIPSADefault } from "@/services/api";

import type {
    Constituents,
    InstrumentDetail,
    ChartDataPoint,
    Instrument
} from "@/types/index";

type ChartPeriod = "1M" | "3M" | "6M" | "1A";
type TabName = "IPSA" | "IGPA" | "NASDAQ" | "DOWN JONES" | "SP/BVL" |string;

export const useInstrumentStore = defineStore("instrument", () => {
  // State
  const constituents = ref<Constituents[]>([]);
  const selectedInstrument = ref<InstrumentDetail | null>(null);
  const chartPeriod = ref<ChartPeriod>("1M");
  const chartData = ref<ChartDataPoint[]>([]);
  const isLoading = ref<boolean>(false);
  const isLoadingInstrument = ref<boolean>(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>("");
  const activeTab = ref<TabName>("IPSA");

  // Computed
  const filteredConstituents = computed(() => {
    if (!searchQuery.value) return constituents.value;
    return constituents.value.filter(
      (constituent) =>
        constituent.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const headerInfo = computed(() => {
    if (!selectedInstrument.value)
      return { name: activeTab.value, value: 0, change: 0, changePercent: 0 };
    return {
      name: selectedInstrument.value.info.name,
      value: selectedInstrument.value.price,
      country: selectedInstrument.value.info.countryName
    };
  });

  // Actions
  async function loadConstituents(): Promise<void> {
    isLoadingInstrument.value = true;
    isLoading.value = true;
    error.value = null;
    try {
        constituents.value = await fetchConstituents(activeTab.value);
      if (!selectedInstrument.value && constituents.value.length > 0) {
        selectedInstrument.value = await fetchIPSADefault();
      }
    } catch (err: any) {
      error.value = err.message || "Error al cargar los instrumentos";
      console.error(error.value);
    } finally {
        isLoadingInstrument.value = false;
        isLoading.value = false;
    }
  }

  async function selectInstrument(instrumentId: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      selectedInstrument.value = await fetchInstrumentDetail(instrumentId);
    //   await loadChartData(instrumentId);
    } catch (err: any) {
      error.value = err.message || "Error al cargar el detalle del instrumento";
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadChartData(instrumentId: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      chartData.value = await fetchChartData(instrumentId, chartPeriod.value);
    } catch (err: any) {
      error.value = err.message || "Error al cargar los datos del gráfico";
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  async function changeChartPeriod(period: ChartPeriod): Promise<void> {
    chartPeriod.value = period;
    if (selectedInstrument.value) {
      await loadChartData(selectedInstrument.value.codeInstrument);
    }
  }

  async function changeTab(tabName: TabName): Promise<void> {
    activeTab.value = tabName;
    await loadConstituents();
  }

  function updateSearchQuery(query: string): void {
    searchQuery.value = query;
  }

  return {
    // State
    constituents,
    selectedInstrument,
    chartPeriod,
    chartData,
    isLoading,
    isLoadingInstrument,
    error,
    searchQuery,
    activeTab,

    // Computed
    filteredConstituents,
    headerInfo,

    // Actions
    loadConstituents,
    selectInstrument,
    loadChartData,
    changeChartPeriod,
    changeTab,
    updateSearchQuery,
  };
});

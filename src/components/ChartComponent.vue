<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import { useInstrumentStore } from "@/store/instrumentStore";
import type { ChartPeriod } from "@/types/index";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler
);

const store = useInstrumentStore();
const isLoading = computed(() => store.isLoading);
const chartData = computed(() => {
  const data = store.chartData ?? [];
  return {
    labels: data.map((entry) => entry.datetimeLastPrice),
    datasets: [
      {
        label: "Precio",
        data: data.map((entry) => entry.lastPrice),
        borderColor: "#0458a0",
        fill: true,
        tension: 0.25,
        backgroundColor: (ctx: any) => {
          const canvas = ctx.chart.ctx;
          const height = ctx.chart.height;
          const gradient = canvas.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, "rgba(4, 88, 160, 0.9)");
          gradient.addColorStop(0.7, "rgba(4, 88, 160, 0.6)");
          gradient.addColorStop(0.9, "rgba(4, 88, 160, 0.3)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
          return gradient;
        },
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: true,
        color: "rgba(176, 176, 176, 0.2)",
      },
    },
    x: {
      ticks: {
        display: false, 
      },

    },
  },
};

const periods: ChartPeriod[] = ["1M", "3M", "6M", "1A"];
const currentPeriod = computed(() => store.chartPeriod);

const changePeriod = (period: ChartPeriod) => {
  store.changeChartPeriod(period);
};
</script>

<template>
  <div class="py-10" v-if="isLoading">
    <v-skeleton-loader type="card" style="height: 32.5vh;"></v-skeleton-loader>
  </div>
  <div v-else class="rounded-lg shadow-lg p-4 mt-5">
    <Line :data="chartData" :options="chartOptions" v-if="store.chartData?.length" />
    <div v-else class="text-center text-gray-500" style="height: 32.5vh;">
      <alert-component message="No hay datos disponibles para el rango de fecha seleccionado" type="info" />
      
    </div>
    
    <div class="d-flex mt-3">
      <v-btn
        v-for="period in periods"
        :key="period"
        size="small"
        variant="flat"
        :color="currentPeriod === period ? '#0458a0' : ''"
        @click="changePeriod(period)"
      >
        {{ period }}
      </v-btn>
    </div>
  </div>
</template>

import type {
  Constituents,
  InstrumentResponse,
  ChartDataPoint,
  InstrumentDetailResponse,
  InstrumentDetail,
  ChartPeriod,
  ChartData,
  ChartEntry
} from "@/types/index";

// Simula latencia de red
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));


export async function fetchConstituents(): Promise<Constituents[]> {
  try {
    const jsonUrl = "/data/constituyentes/constituensList.json";
    await delay(500);
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Error al cargar los datos");
    const jsonData: InstrumentResponse = await response.json();
    return jsonData.data.constituents.map((item) => ({ ...item }));
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return [];
  }
}

export async function fetchIPSADefault(): Promise<InstrumentDetail> {
  try {
    const jsonUrl = "/data/resumen/IPSA.json";
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Error al cargar los datos");
    const jsonData: InstrumentDetailResponse = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return null;
  }
}

export async function fetchInstrumentDetail(
  instrumentId: string
): Promise<InstrumentDetail> {
  try {
    const jsonUrl = `/data/resumen/${instrumentId}.json`;
    await delay(500);
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Error al cargar los datos");
    const jsonData: InstrumentDetailResponse = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return null;
  }
}

export async function fetchChartData(
  instrumentId: string,
  period: ChartPeriod = "1M"
): Promise<ChartEntry[]|null> {
  try {
    const jsonUrl = `/data/history/history-${instrumentId}.json`;
    await delay(500);
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Error al cargar los datos");
    const jsonData: ChartData  = await response.json();
    const daysAgoMap: Record<ChartPeriod, number> = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1A": 365,
    };
    const daysAgo = daysAgoMap[period];
    const nowTs = Math.floor(Date.now() / 1000);
    const cutoffTs = nowTs - daysAgo * 24 * 60 * 60;
    return jsonData.data.chart.filter(entry => entry.datetimeLastPriceTs >= cutoffTs);
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return null;
  }
}

import type {
  Constituents,
  InstrumentResponse,
  ChartDataPoint,
  InstrumentDetailResponse,
  InstrumentDetail,
} from "@/types/index";

// Simula latencia de red
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

type ChartPeriod = "1M" | "3M" | "6M" | "1A";

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

const generateChartData = (
  instrumentId: string,
  period: ChartPeriod
): ChartDataPoint[] => {
  const days: Record<ChartPeriod, number> = {
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1A": 365,
  };

  const numDays = days[period] || 30;
  const basePrice = mockDetails[instrumentId]?.lastPrice || 1000;
  const data: ChartDataPoint[] = [];

  const now = new Date();
  for (let i = numDays; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const randomFactor = (Math.random() - 0.5) * 0.05;
    const trend = instrumentId.includes("1") ? 0.001 : -0.001;
    const priceChange = basePrice * (randomFactor + trend * i);

    data.push({
      date: date.toISOString().split("T")[0],
      price: basePrice + priceChange,
    });
  }

  return data;
};

export async function fetchChartData(
  instrumentId: string,
  period: ChartPeriod = "1M"
): Promise<ChartDataPoint[]> {
  await delay(700);
  return generateChartData(instrumentId, period);
}

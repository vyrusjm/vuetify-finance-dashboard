export interface Instrument {
  name: string;
  shortName: string;
  countryName: string;
  codeInstrument: string;
}

export interface Constituents {
  codeInstrument: string;
  name: string;
  shortName: string;
  pctDay: number;
  lastPrice: number;
  datetimeLastPrice: string;
  volumeMoney: number;
  accumulatedVolumeMoney: number;
  tend: string;
  performanceAbsolute: number;
  performanceRelative: number;
}


export interface InstrumentResponse {
  success: boolean;
  code: number;
  data: {
    info: Instrument;
    constituents: Constituents[];
  };
}

export interface ChartDataPoint {
  date: string;
  price: number;
}

export type InstrumentDetail = {
  info: {
    name: string;
    shortName: string;
    countryName: string;
    currencyName: string;
    currencySymbol: string;
    codeInstrument: string;
    marketName: string;
    hourOpen: string;
    hourClose: string;
    trading: boolean;
    exchangeRate: number;
  };
  price: InstrumentPrice[];
} | null;

export interface InstrumentPrice {
  lastPrice: number;
  datetimeLastPrice: string;
  openPrice: number;
  closePrice: number;
  datetimeClosePrice: string;
  performanceAbsolute: number;
  performanceRelative: number;
  bid: number;
  bidVolume: number;
  bidDatetime: string;
  ask: number;
  askVolume: number;
  askDatetime: string;
  volumeMoney: number;
  accumulatedVolumeMoney: number;
  volumeInstrument: number;
  accumulatedVolumeInstrument: number;
  tend: string;
  maxDay: number;
  minDay: number;
  min52W: number;
  max52W: number;
  pct30D: number;
  pctRelW52: number;
  pctRelCY: number;
}

export interface InstrumentDetailResponse {
  success: boolean;
  code: number;
  data: InstrumentDetail;
}

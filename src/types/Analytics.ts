export interface Analytics {
  lineChart: LineChart;
  barChart: BarChart;
  pieChart: PieChart;
  products: Products;
  statistics: StatsItem[];
}

export type LineChart = { xAxis: string[]; lines: ChartItem[] };
export type BarChart = { xAxis: string[]; bars: ChartItem[] };
export type PieChart = ChartItem[];
export type Products = Product[];

export interface ChartItem {
  label: string;
  values: number[];
}

interface Product {
  name: string;
  avgAmount: number;
  avgPeriod: number;
}

export interface StatsItem {
  name: string;
  value: number;
  growthValue: number;
  mark: string;
}

export interface AnalyticsParams {
  city: string;
  currency: string;
  period: string;
  startDate: string | null;
  endDate: string | null;
}

export interface AnalyticsDictionaries {
  cities: string[];
  currencies: string[];
  periods: string[];
  startDate: string;
}

export interface AnalyticsRequest extends Omit<AnalyticsParams, 'period' | 'startDate' | 'endDate'> {
  period?: string;
  startDate?: string | null;
  endDate?: string | null;
}

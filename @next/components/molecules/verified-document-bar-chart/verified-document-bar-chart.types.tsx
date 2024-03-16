export interface VerifiedDocumentBarChartType {
  name?: string;
  switchChart?: string;
  onChangeSwitch?: (item: string) => void;
  startFrom?: string;
  chartHeight: number;
}

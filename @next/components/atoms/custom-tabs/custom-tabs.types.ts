export interface CustomTabsProps {
  mapperObjProp: any;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  paddingTab?: string;
  paddingPanel?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  orientation?: any;
  justifyContentTab?: string;
  alignItemsTab?: string;
  onCustomChange?: any;
  tabsWidth?: any;
  tabsShadow?: any;
  tabsBorderRadius?: any;
  tabsContainerPadding?: any;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

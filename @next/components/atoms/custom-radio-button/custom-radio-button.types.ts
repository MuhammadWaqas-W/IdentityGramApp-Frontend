import { Control } from 'react-hook-form';

export interface CustomRadioProps {
  label?: any;
  size?: number;
  control: Control<any, any>;
  name: string;
  id: string;
  labelId?: string;
  value?: any;
  data?: any;
  width?: string;
  height?: string;
  boxShadow?: string;
  border?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  onChange?: (value: any) => void;
  select?: boolean;
  maxWidth?: string;
  borderRadius?: string;
  background?: string;
  placeholder?: string;
  inputRef?: any;
  row?: boolean;
  defaultValue?: any;
  extraMessage?: boolean | string;
  labelWidth?: any;
  disabled?: boolean;
  isRequired?: boolean;
}

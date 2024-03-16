import { Control } from 'react-hook-form';

export interface formProps {
  control?: Control<any, any>;
  id?: string;
  label?: any;
  icon?: any;
  name: any;
  type: string;
  hint?: string;
  InputLabelProps?: any;
  value?: any;
  size?: any;
  disabled?: boolean;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
  shrink?: boolean;
  onClick?: any;
  customOnChange?: any;
  isDebounce?: boolean;
  placeholder?: string;
  loading?: boolean;
  padding?: string | number;
  EndIcon?: any;
  StartIcon?: any;
  styleLabel?: any;
  variant?: any;
  height?: string | number;
  labelText?: any;
  styleTextField?: any;
  notRequired?: any;
  ref?: any;
  fullWidth?: boolean;
  width?: string | number | undefined;
  inputRef?: any;
}

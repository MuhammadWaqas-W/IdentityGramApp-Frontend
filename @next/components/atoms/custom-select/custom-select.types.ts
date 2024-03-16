import { Control } from 'react-hook-form';

export interface CustomSelectProps {
  control?: Control<any, any>;
  name: string;
  id: string;
  data: any;
  label?: string;
  labelId?: string;
  value?: any;
  padding?: string | number;
  customOnChange?: any;
  customValue?: any;
  placeholder?: string;
  defaultValue?: any;
  fullWidth?: boolean;
  minWidth?: any;
  styleMenu?: any;
  styleSelect?: any;
  stylePaperProps?:any;
}

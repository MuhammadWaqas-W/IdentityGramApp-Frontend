import { Control } from 'react-hook-form';

export interface CustomCheckBoxProps {
  label?: any;
  size?: number;
  control?: Control<any, any>;
  name: string;
  value?: any;
  data?: any;
  styleLabel?: any;
  styleCheckBox?: any;
  customOnChange?: (value: any) => void;
  customValue?: null;
  checkboxDisabled?:boolean;
}

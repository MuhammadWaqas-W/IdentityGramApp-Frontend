import { Control } from 'react-hook-form';

export interface CustomReactSelectProps {
  label?: any;
  control?: Control<any, any>;
  name: string;
  id: string;
  title?: any;
  data?: any;
  placeholder?: string;
  customOnChange?: any;
  customValue?: any;
  loadOptions?: any;
  filterOption?: any;
  fieldDisabled?: boolean;
  styleLabel?: any;
  isRequired?: boolean;
}

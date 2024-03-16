import { Control } from 'react-hook-form';

export interface CustomPhoneInputProps {
  control: Control<any, any>;
  name: string;
  countryCode: string;
}

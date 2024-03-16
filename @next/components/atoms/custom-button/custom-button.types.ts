export interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: any;
  padding?: number | string;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
  margin?: string | number;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  StartIcon?: any;
  EndIcon?: any;
  borderColor?: string;
  maxWidth?: string;
  fontWeight?: string;
  fontType?: string;
  borderRadius?: string;
  border?: string;
  fontSize?: string;
  disabledColor?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  backgroundHover?: string;
  colorHover?: string;
  styleCustomButton?: any;
}

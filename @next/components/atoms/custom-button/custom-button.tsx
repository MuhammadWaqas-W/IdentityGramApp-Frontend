import { LoadingButton } from '@mui/lab';
import { CustomButtonProps } from './custom-button.types';

export const CustomButton = ({
  children,
  background = 'primary.main',
  padding,
  width,
  height,
  color,
  margin,
  fullWidth = true,
  variant = 'contained',
  borderColor,
  maxWidth,
  disabledColor = '#8d8d8d',
  border,
  backgroundHover,
  colorHover,
  StartIcon,
  EndIcon,
  borderRadius,
  styleCustomButton,
  ...props
}: CustomButtonProps): JSX.Element => {
  return (
    <LoadingButton
      {...props}
      variant={variant}
      fullWidth={fullWidth}
      startIcon={StartIcon}
      endIcon={EndIcon}
      sx={{
        border,
        borderColor,
        color,
        padding,
        margin,
        width,
        maxWidth,
        whiteSpace: 'nowrap',
        height,
        borderRadius: borderRadius,
        backgroundColor: background,
        '&:hover': {
          backgroundColor: backgroundHover,
          borderColor,
          color: colorHover,
        },
        '&:disabled': {
          pointerEvents: 'all !important',
          cursor: 'not-allowed !important',
        },
        ...styleCustomButton,
      }}
    >
      {children}
    </LoadingButton>
  );
};

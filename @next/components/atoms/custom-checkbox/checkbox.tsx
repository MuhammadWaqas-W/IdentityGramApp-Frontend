import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CustomCheckBoxProps } from './custom-checkbox.types';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

function BpCheckbox({
  error,
  size,
  styleCheckBox,
  checkboxDisabled,
  ...rest
}: any) {
  return (
    <Checkbox
      disableRipple
      {...rest}
      sx={{
        color: error ? 'red' : 'primary',
        '&.Mui-checked': {
          color: error ? 'red' : 'primary.main',
          border: 'white',
          '&:hover': {
            border: 'white !important',
          },
        },
        '& .MuiSvgIcon-root': {
          fontSize: size,
        },
        ...styleCheckBox,
      }}
    />
  );
}

export const CustomCheckBox: FC<CustomCheckBoxProps> = ({
  control = undefined,
  name,
  label,
  data,
  required,
  size = 20,
  styleLabel,
  styleCheckBox,
  customOnChange = null,
  customValue = null,
  checkboxDisabled,
  ...props
}: any) => {
  const { control: initializeControl } = useForm();
  return (
    <Controller
      control={control ?? initializeControl}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { isTouched, isDirty, error },
      }) => (
        <FormControlLabel
          {...props}
          {...{
            onBlur,
            name,
          }}
          onChange={customOnChange ? customOnChange : onChange}
          value={customOnChange ? customValue : value}
          control={
            <BpCheckbox
              error={error}
              size={size}
              styleCheckBox={styleCheckBox}
            />
          }
          checked={Boolean(customValue ? customValue : value)}
          label={label}
          disabled={checkboxDisabled}
          sx={{ ...styleLabel }}
        />
      )}
    />
  );
};

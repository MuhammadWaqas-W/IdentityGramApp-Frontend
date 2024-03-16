import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form';
import { formProps } from './custom-text-feild.types';
import { Typography } from '@mui/material';

export const CustomTextField: FC<formProps> = ({
  type,
  name,
  control = undefined,
  loading,
  customOnChange = null,
  padding = 12,
  EndIcon,
  styleTextField,
  StartIcon,
  variant = 'outlined',
  labelText,
  notRequired,
  fullWidth = false,
  width = undefined,
  styleLabel,
  ...props
}) => {
  const { control: initializeControl } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {labelText && (
        <InputLabel id={labelText} sx={{ ...styleLabel }}>
          {labelText}

          <Typography sx={{ pl: 0.5, color: 'error.main' }} component={'span'}>
            {notRequired ? '' : '*'}
          </Typography>
        </InputLabel>
      )}
      <Controller
        control={control ?? initializeControl}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { isTouched, isDirty, error },
        }) => (
          <TextField
            {...{
              onBlur,
              name,
            }}
            inputProps={{
              style: {
                padding,
                width,
              },
            }}
            {...(!customOnChange ? (value = { value }) : null)}
            fullWidth={fullWidth}
            onChange={customOnChange ? customOnChange : onChange}
            inputRef={ref}
            variant={variant}
            autoComplete="off"
            error={Boolean(error)}
            helperText={error && error.message}
            type={showPassword ? 'text' : type}
            sx={{
              '&  .MuiFormHelperText-root.Mui-error': {
                backgroundColor: '#fff',
                margin: 0,
              },
              ...styleTextField,
            }}
            InputProps={{
              endAdornment:
                type === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ color: 'primary.main' }}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ) : (
                  EndIcon
                ),
              startAdornment: StartIcon,
            }}
            {...props}
          />
        )}
      />
    </>
  );
};

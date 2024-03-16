import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CustomReactSelectProps } from './custom-react-select.types';
import { Box, FormHelperText, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { customStyle } from './react-select.style';

const animatedComponents = makeAnimated();

export const CustomReactSelect: FC<CustomReactSelectProps> = ({
  control,
  name,
  label,
  data,
  customOnChange = null,
  customValue = null,
  fieldDisabled,
  isRequired,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { isTouched, isDirty, error },
        formState: { errors },
      }) => (
        <FormControl fullWidth>
          {label ? (
            <Box display="flex">
              <Typography variant="body1">{label}</Typography>
              <Typography
                sx={{ pl: 0.5, color: 'error.main' }}
                component={'span'}
              >
                {isRequired ? '*' : ''}
              </Typography>
            </Box>
          ) : null}
          <Select
            isDisabled={fieldDisabled}
            closeMenuOnSelect={true}
            components={animatedComponents}
            defaultValue={{ title: 'Select Value', _id: '' }}
            options={data}
            styles={customStyle(error)}
            onChange={customOnChange ? customOnChange : onChange}
            value={customOnChange ? customValue : value}
            {...props}
            {...{
              onBlur,
              name,
            }}
          />
          <FormHelperText sx={{ m: 0 }} error>
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

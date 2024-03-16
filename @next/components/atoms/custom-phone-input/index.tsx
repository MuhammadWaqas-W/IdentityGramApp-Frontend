import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import { CustomPhoneInputProps } from './custom-phone-input.types';
import 'react-phone-input-2/lib/style.css';

export const CustomPhoneInput: React.FC<CustomPhoneInputProps> = (props) => {
  const { countryCode, control, name } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => (
        <FormControl style={{ width: '100%' }}>
          <PhoneInput
            inputProps={{
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            }}
            inputStyle={{
              width: '100%',
              height: '43px',
              border: error
                ? '1.5px solid red'
                : isFocused
                ? '1.5px solid green'
                : undefined,
            }}
            containerStyle={{ margin: '0px' }}
            buttonStyle={{
              border: error
                ? '1.5px solid red'
                : isFocused
                ? '1.5px solid green'
                : undefined,
            }}
            dropdownStyle={{ height: '200px' }}
            {...field}
            country={countryCode && countryCode?.toLowerCase()}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

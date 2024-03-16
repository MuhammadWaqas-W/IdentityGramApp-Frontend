import { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomSelectProps } from './custom-select.types';
import Select from '@mui/material/Select';
import { FormHelperText, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

const SelectIcon = (props: any): JSX.Element => (
  <KeyboardArrowDownIcon {...props} />
);

export const CustomSelect: FC<CustomSelectProps> = ({
  control = undefined,
  name,
  label,
  data,
  padding = 1.5,
  minWidth = 150,
  customOnChange = null,
  customValue = null,
  defaultValue = undefined,
  fullWidth = false,
  styleMenu,
  styleSelect,
  stylePaperProps,
  placeholder,
  ...props
}) => {
  const { control: initializeControl } = useForm();
  const menuProps: any = {
    PaperProps: {
      sx: {
        marginTop: '10px',
        ...stylePaperProps,
      },
    },
  };
  return (
    <Controller
      control={control ?? initializeControl}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { isTouched, isDirty, error },
        formState: { errors },
      }) => (
        <FormControl
          fullWidth={fullWidth}
          sx={{
            '& .MuiOutlinedInput-input': {
              padding,
              minWidth: minWidth,
            },
          }}
        >
          {label ? (
            <Typography
              variant="caption"
              color="common.black"
              sx={{ mb: '10px' }}
            >
              {label}
            </Typography>
          ) : null}
          <Select
            {...props}
            {...{
              onBlur,
              name,
            }}
            onChange={customOnChange ? customOnChange : onChange}
            value={customOnChange ? customValue : value}
            inputRef={ref}
            error={Boolean(error)}
            fullWidth={fullWidth}
            MenuProps={menuProps}
            IconComponent={(props) => SelectIcon(props)}
            displayEmpty
            sx={{
              ...styleSelect,
            }}
          >
            {placeholder && (
              <MenuItem value="">
                <em
                  style={{
                    fontStyle: 'normal',
                    color: '#a5a5a5',
                  }}
                >
                  {placeholder}
                </em>
                {/* add a disabled empty option */}
              </MenuItem>
            )}

            {data?.map(({ label, value }: any, key: number) => (
              <MenuItem value={value} key={key} sx={{ ...styleMenu }}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {error?.message && (
            <FormHelperText error>{error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

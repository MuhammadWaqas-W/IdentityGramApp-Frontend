import * as React from 'react';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';
import { CustomRadioProps } from './custom-radio-button.types';

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
  error: FieldError | undefined;
  width?: any;
}

interface NewFormControlLabelProps extends FormControlLabelProps {
  error: FieldError | undefined;
  width?: any;
}

const BpIcon = styled('span')(({ theme, error }: any) => ({
  borderRadius: '50%',
  width: 23,
  height: 23,
  border: error ? '1px solid red' : '1px solid #645CAA',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#faf5f5',
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme, error }: any) => ({
  border: '2px solid #645CAA',
  backgroundColor: 'white',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage: 'radial-gradient(#645CAA,#645CAA 36%,transparent 40%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#fff',
  },
}));

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} sx={{ width: props?.width }} />
))(({ theme, checked, error }) => ({
  '.MuiFormControlLabel-label': (error || checked) && {
    color: error ? 'red' : theme.palette.primary.main,
  },
  '&:hover': {
    //  backgroundColor: theme.palette?.primary.main
  },
}));

function MyFormControlLabel({ error, ...props }: NewFormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} error={error} {...props} />;
}
function BpRadio({ error, size, ...rest }: RadioProps | any) {
  return (
    <Radio
      disableRipple
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon error={error} {...rest} />}
      {...rest}
    />
  );
}

export const CustomizedRadios: React.FC<CustomRadioProps> = ({
  control,
  name,
  label,
  data,
  id,
  size = 20,
  extraMessage = '',
  labelWidth = undefined,
  disabled = false,
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
      }) => (
        <FormControl>
          <FormLabel id={id}>
            <Box display="flex">
              <Typography variant="caption">{label}</Typography>
              <Typography
                sx={{ pl: 0.5, color: 'error.main' }}
                component={'span'}
              >
                {isRequired ? '*' : ''}
              </Typography>
            </Box>
          </FormLabel>
          <RadioGroup
            aria-labelledby={id}
            {...{
              onChange,
              onBlur,
              value,
              name,
            }}
            {...props}
          >
            {data?.map(({ label, value }: any, key: number) => (
              <MyFormControlLabel
                width={labelWidth}
                key={key}
                error={error}
                value={value}
                control={
                  <BpRadio error={error} size={size} disabled={disabled} />
                }
                label={label}
              />
            ))}
          </RadioGroup>
          <FormHelperText
            error
            variant="standard"
            sx={{
              textAlign: 'left',
              fontSize: '13px',
              mt: 0.5,
            }}
          >
            {error?.message}
          </FormHelperText>
          {error && Boolean(extraMessage) && (
            <FormHelperText
              error
              variant="standard"
              sx={{
                textAlign: 'left',
                border: '1px solid red',
                fontSize: '15px',
                mt: 2,
                p: 1,
              }}
            >
              {extraMessage}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

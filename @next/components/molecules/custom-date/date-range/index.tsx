import { Box, TextField, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomDateRange = (props: any) => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    isOpen,
    isLable = true,
  } = props;

  if (!isOpen) return <></>;

  return (
    <Box>
      {isLable && (
        <Typography variant="h6" sx={{ color: 'secondary.main' }}>
          Date Range
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}
      >
        <DatePicker
          onChange={(date) => setStartDate(date)}
          placeholderText="Select a date"
          startDate={startDate}
          selected={startDate}
          selectsStart
          showMonthDropdown
          useShortMonthInDropdown
          showYearDropdown
          customInput={
            <TextField
              id="outlined-basic"
              variant="outlined"
              size={'medium'}
              className={'datepickerinput'}
              fullWidth
              sx={{
                color: 'secondary.main',
                fontSize: '12px',
                borderRadius: '3px',
                '&MuiInputBase-root': { padding: '20px 20px' },
              }}
            />
          }
        />
        <Typography variant="h6" sx={{ color: 'secondary.main', px: 1 }}>
          To
        </Typography>
        <DatePicker
          onChange={(date) => setEndDate(date)}
          placeholderText="Select a date"
          selected={endDate}
          minDate={startDate}
          startDate={endDate}
          disabled={!startDate}
          showMonthDropdown
          useShortMonthInDropdown
          showYearDropdown
          customInput={
            <TextField
              id="outlined-basic"
              variant="outlined"
              size={'medium'}
              className={'datepickerinput'}
              fullWidth
              sx={{
                color: 'secondary.main',
                fontSize: '12px',
                borderRadius: '3px',
                '&MuiInputBase-root': { padding: '20px 20px' },
              }}
            />
          }
        />
      </Box>
    </Box>
  );
};

import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { CandlestickChartSwitchesType } from './candlestick-chart-switches.types';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export const CandlestickChartSwitches = ({
  onChangeSwitch,
}: CandlestickChartSwitchesType) => {
  const [duration, setDuration] = React.useState('1S');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography
        variant="h4"
        color="primary.light"
        sx={{ mr: { sm: '30px', xs: '10px' } }}
      >
        Time
      </Typography>
      <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>
        {['1S', '1H', '1D', '1W', '1M', '1Y'].map((item) => (
          <Box
            key={item}
            sx={{
              backgroundColor: item === duration ? 'primary.main' : '#F9FAFB',
              color: item === duration ? 'common.white' : 'secondary.lighter',
              mr: '6px',
              userSelect: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '7.81379px',
              height: '31px',
              width: '41px',
              fontWeight: 600,
              fontSize: '12px',
            }}
            onClick={() => {
              if (item !== duration) {
                setDuration(item);
                onChangeSwitch?.(item);
              }
            }}
          >
            {item === 'ICON' ? <KeyboardArrowDownRoundedIcon /> : item}
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, display: { xs: 'flex', sm: 'none' } }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Box sx={{ display: 'flex' }}>
          {['ICON'].map((item) => (
            <Box
              key={item}
              sx={{
                backgroundColor: item === duration ? 'primary.main' : '#F9FAFB',
                color: item === duration ? 'common.white' : 'secondary.lighter',
                mr: '6px',
                userSelect: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '7.81379px',
                height: '31px',
                width: '41px',
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              <KeyboardArrowDownRoundedIcon />
            </Box>
          ))}
        </Box>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {['1S', '1H', '1D', '1W', '1M', '1Y'].map((item) => (
            <MenuItem key={item} onClick={handleClose}>
              <Box
                sx={{
                  backgroundColor:
                    item === duration ? 'primary.main' : '#F9FAFB',
                  color:
                    item === duration ? 'common.white' : 'secondary.lighter',
                  mr: '6px',
                  userSelect: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '7.81379px',
                  height: '31px',
                  width: '41px',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
                onClick={() => {
                  if (item !== duration) {
                    setDuration(item);
                    onChangeSwitch?.(item);
                  }
                }}
              >
                {item}
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

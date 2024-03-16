import { Box } from '@mui/material';
import React from 'react';
import { DashboardSwitchType } from './dashboard-switch.types';

export const DashboardSwitch = ({
  onChangeSwitch,
  startFrom,
}: DashboardSwitchType) => {
  const [duration, setDuration] = React.useState(startFrom);
  return (
    <Box
      sx={{
        width: '182px',
        position: 'relative',
        height: '49px',
        background: '#F9FAFB',
        borderRadius: '14.7687px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      {['Weekly', 'Monthly'].map((item) => (
        <Box
          key={item}
          sx={{
            cursor: 'pointer',
            height: '34px',
            width: '77px',
            borderRadius: '13px',
            fontWeight:
              item === duration ? 'fontWeightMedium' : 'fontWeightRegular',
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: item === duration ? 'primary.main' : '#F9FAFB',
            color: item === duration ? 'common.white' : 'primary.light',
            fontSize: '14px',
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
      ))}
    </Box>
  );
};

import { Box } from '@mui/material';
import { CustomCircleProps } from './circle-animation.types';

export const CircleAnimation = ({ children }: CustomCircleProps) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ zIndex: 11, width: '100%' }}>{children}</Box>
      <Box className="circle-animation">
        <Box className="inner-circle">
          <Box className="innerMost-circle"></Box>
        </Box>
      </Box>
    </Box>
  );
};

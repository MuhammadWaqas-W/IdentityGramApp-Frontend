import { Typography, Box } from '@mui/material';
import { StatusProps } from './status.types';
import { SmallLoader } from '@molecules';

export const Status = ({
  title,
  color,
  bgColor,
  children,
  styleWrapper,
  handleStatusClick,
  isLoading,
}: StatusProps): JSX.Element => {
  if (isLoading) return <SmallLoader isLoader={isLoading} />;
  return (
    <Box
      sx={{
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        padding: '8px 8px',
        backgroundColor: bgColor,
        ...styleWrapper,
      }}
      onClick={handleStatusClick}
    >
      <Typography variant="h4" sx={{ color: color, whiteSpace: 'nowrap' }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

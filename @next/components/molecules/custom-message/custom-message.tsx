import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { CustomMessageProps } from './error-message.types';

export const CustomMessage: FC<CustomMessageProps> = ({
  text,
  fontSize = '18px',
  hasMessage,
  error,
  mb = 1,
  mt = 1,
  height = 'auto',
  maxHeight = 'auto',
  width = '100%',
  maxWidth = '100%',
  isBold,
}) => {
  if (!hasMessage) return null;
  return (
    <Box
      color={error ? 'red' : 'green'}
      fontWeight={isBold ? 'bold' : 'normal'}
      fontSize={fontSize}
      maxWidth={maxWidth}
      mb={mb}
      mt={mt}
      width={width}
      height={height}
      maxHeight={maxHeight}
    >
      <Typography>{text}</Typography>
    </Box>
  );
};

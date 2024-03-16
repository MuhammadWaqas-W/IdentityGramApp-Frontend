import React, { useState, FC } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  message: string;
  type: AlertColor | undefined;
  isOpen?: boolean;
};

export const TransitionAlerts: FC<Props> = ({ message, type, isOpen }) => {
  const [open, setOpen] = useState(isOpen);
  
  return (
    <Collapse in={isOpen}>
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

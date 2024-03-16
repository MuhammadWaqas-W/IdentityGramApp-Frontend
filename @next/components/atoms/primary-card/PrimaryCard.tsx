import React from 'react';
import Card from '@mui/material/Card';
import { CustomCardProps } from './primary-card.types';
import { Grid } from '@mui/material';

export const PrimaryCardAtom: React.FC<CustomCardProps> = ({
  wrapperStylObject,
  StyleObject,
  children,
  clickHandler,
  xs,
  sm,
  md,
  xl,
  lg,
  ...props
}: CustomCardProps) => {
  return (
    <Grid container>
      <Grid
        item
        xs={xs}
        md={md}
        xl={xl}
        lg={lg}
        sm={sm}
        sx={{ ...wrapperStylObject, margin: 'auto' }}
      >
        <Card
          sx={{
            minWidth: '240px',
            minHeight: '280px',
            border: '1px solid rgba(24, 25, 69, 0.1)',
            p: 2,
            boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
            borderRadius: '32px',
            ...StyleObject,
          }}
          {...props}
          variant="outlined"
          onClick={clickHandler}
        >
          {children}
        </Card>
      </Grid>
    </Grid>
  );
};

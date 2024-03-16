import React from 'react';
import { DocTypeCardMolecules } from '@molecules';
import { Grid, Typography } from '@mui/material';
import { cardDataList } from '@constants';

export const ReportsOrganisms = () => {
  return (
    <React.Fragment>
      <Typography variant="h2" sx={{ color: '#6E7191', ml: 1, my: 2 }}>
        Select Document Type
      </Typography>
      <Grid container columnSpacing={5} rowGap={5}>
        {cardDataList.map((item) => (
          <Grid item sm={12} md={6} lg={4} key={item.heading}>
            <DocTypeCardMolecules
              image={item.image}
              heading={item.heading}
              subheading={item.subheading}
              bgColor={item.bgColor}
              textColor={item.textColor}
              type={item.type}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

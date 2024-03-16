import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import {
  DocumentVerificationMolecule,
  RecentVerificationsMolecule,
  VerificationDataMolecule,
  VerificationStatusMolecule,
  VerifiedDocumentBarChart,
} from '@molecules';
import { PrimaryCardAtom } from '@atoms';

export const CompanyAdminDashboardOrganism = () => {
  const [switchChart, setSwitchChart] = useState('Weekly');

  const onSwitchItem = (item: string) => {
    setSwitchChart(item);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item container spacing={2}>
          <Grid item xs={12} xl={8}>
            <VerificationDataMolecule />
            <Grid mt={3} container>
              <PrimaryCardAtom
                xs={12}
                StyleObject={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 0,
                  borderRadius: '12px',
                }}
              >
                <VerifiedDocumentBarChart
                  chartHeight={220}
                  startFrom="Weekly"
                  switchChart={switchChart}
                  name={
                    switchChart === 'Weekly'
                      ? 'Weekly Reports'
                      : 'Monthly Reports'
                  }
                  onChangeSwitch={onSwitchItem}
                />
              </PrimaryCardAtom>
            </Grid>
            <RecentVerificationsMolecule />
          </Grid>
          <Grid item xs={12} xl={4}>
            <DocumentVerificationMolecule />
            <VerificationStatusMolecule />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

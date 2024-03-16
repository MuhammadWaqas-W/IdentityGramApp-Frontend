import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

export const IntegrationInfoMolecule = (props: any) => {
  const { type, baseURL, privateKey, publishKey } = props;
  const [showPrivateKey, setShowPrivateKey] = useState('password');
  return (
    <Grid container mt={3} mb={3}>
      <Grid item xs={12} md={7}>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <Typography
              variant="h6"
              sx={{ color: 'primary.dark', fontWeight: 500 }}
            >
              Type
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.light' }}>
              {type}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography
              variant="h6"
              sx={{ color: 'primary.dark', fontWeight: 500 }}
            >
              Base URL
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.light' }}>
              {baseURL}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h6"
              sx={{ color: 'primary.dark', fontWeight: 500 }}
            >
              Private Key
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.light',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <input
                type={showPrivateKey}
                value={privateKey}
                disabled
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                  width: '280px',
                }}
              />
              {showPrivateKey === 'text' ? (
                <Visibility
                  onClick={() => setShowPrivateKey('password')}
                  sx={{ cursor: 'pointer' }}
                />
              ) : (
                <VisibilityOff
                  onClick={() => setShowPrivateKey('text')}
                  sx={{ cursor: 'pointer' }}
                />
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h6"
              sx={{ color: 'primary.dark', fontWeight: 500 }}
            >
              Publishable Key
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.light' }}>
              {publishKey}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

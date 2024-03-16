import React from 'react';
import { CustomCheckBox } from '@atoms';
import { Box, Typography } from '@mui/material';

export const IntegrationDocumentMol = ({ documents }: any) => {
  return (
    <Box
      sx={{
        border: '1px solid #E8E8EC',
        p: 3,
        mt: 3,
        borderRadius: '6px',
        '@media screen and (max-width: 600px)': {
          border: 'none',
        },
      }}
    >
      {Object?.keys(documents)?.map((key) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '400px',
            p: 3,
            borderBottom: '1px solid #E8E8EC',
            borderRadius: '5px',
            backgroundColor: '#F9FAFB',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {(key === 'passport' && 'Passport') ||
              (key === 'drivingLicense' && 'Driving License') ||
              (key === 'proofOfAddress' && 'Proof Of Address') ||
              (key === 'residencePermit' && 'Residence Permit')}
          </Typography>
          <CustomCheckBox
            styleCheckBox={{
              '& MuiCheckbox-root': {
                background: 'red',
                borderRadius: '20px',
              },
            }}
            styleLabel={{
              color: 'primary.dark',
              fontSize: '14px',
              fontWeight: 400,
            }}
            name="document"
            customValue={documents[key]}
            checkboxDisabled
            label={'Available'}
          />
        </Box>
      ))}
    </Box>
  );
};

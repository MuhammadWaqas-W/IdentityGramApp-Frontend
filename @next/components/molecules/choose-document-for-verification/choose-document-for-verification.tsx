import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import router from 'next/router';
import { chooseDocumentForVerificationData } from '@constants';

export const ChooseDocumentForVerification = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <Typography
          sx={{
            color: 'primary.dark',
            fontSize: { xs: '14px', md: '24px' },
            fontWeight: 500,
            textAlign: 'center',
            py: { xs: 2, md: 8 },
            px: { xs: 2, md: 0 },
          }}
        >
          Choose the document to be verified from options below:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            {chooseDocumentForVerificationData?.map((item) => (
              <Box
                key={item.name}
                sx={{
                  width: { xs: '300px', md: '641px' },
                  display: 'flex',
                  alignItems: 'center',
                  height: '86px',
                  border: '2px solid #F1F1F0',
                  my: 2,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
                  },
                }}
                onClick={() =>
                  router?.push({
                    pathname: '/app/verifications/verification-proccess',
                    query: { keyword: item?.keyword, type: 'front' },
                  })
                }
              >
                <Box sx={{ width: 60, height: 60, ml: 2 }}>
                  <Image
                    src={item?.icon}
                    alt=""
                    style={{ width: 44, height: 44 }}
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.9,
                    pl: 1,
                    color: 'primary.light',
                  }}
                >
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

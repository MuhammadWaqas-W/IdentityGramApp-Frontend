import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { notVisible, visible, outOfFrame, PassportImage } from '@images';
import { removeIcon, successIcon } from '@icons';
import Image from 'next/image';
import { CustomButton } from '@atoms';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorIcon from '@mui/icons-material/Error';

export const VerificationOnFail = ({
  documentImage = PassportImage,
  tryAgain,
  styleImage,
  hitsCount,
  setHitsCounts,
  verificationByPass,
  responseMessage,
}: any) => {
  const tryAgainHanlder = () => {
    tryAgain(true);
    localStorage.removeItem('hitcount');
    setHitsCounts(0);
  };
  return (
    <>
      <Grid container sx={{ pt: 3 }}>
        {hitsCount === 3 && (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ py: 1, color: 'primary.main' }}>
              Are you Sure the given document is valid?
            </Typography>
          </Grid>
        )}
        {hitsCount === 3 && (
          <Grid item xs={12} sx={{ margin: 'auto', py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <CustomButton
                padding="10px"
                width="100px"
                onClick={verificationByPass}
              >
                <CheckIcon />
              </CustomButton>
              <CustomButton
                backgroundHover="transparent"
                border="1px solid #645caa"
                background="#fff"
                width="100px"
                padding="10px"
                onClick={tryAgainHanlder}
              >
                <ClearIcon sx={{ color: 'primary.main' }} />
              </CustomButton>
            </Box>
          </Grid>
        )}
        <Grid
          item
          xs={11}
          md={8}
          lg={5}
          sx={{
            background: 'black',
            margin: 'auto',
            borderRadius: '30px',
            boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
            py: { xs: 4, md: 6, lg: 8 },
            px: { xs: 2, md: 6, lg: 8 },
          }}
        >
          <Box>
              <Box
                border="2px dotted"
                borderColor="error.main"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderRadius: 2,
                  ...styleImage,
                }}
              >
                <img
                  src={documentImage}
                  alt=""
                  style={{ width: '100%', height: '100%', }}
                />
              </Box>
            <Box
              sx={{
                backgroundColor: 'error.main',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                p: 1,
                mt: 2,
                width: 'fit-content',
                borderRadius: 1,
              }}
            >
              <Typography variant="h4" sx={{ px: 2, color: 'white' }}>
                {responseMessage?.message}
              </Typography>
              <ErrorIcon sx={{ color: 'white' }} />
            </Box>
          </Box>
        </Grid>
        {hitsCount !== 3 && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ pt: 3 }}>
              <CustomButton
                maxWidth="330px"
                width="330px"
                padding="10px"
                onClick={() => tryAgain(true)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    transition: 'all .2s ease-in-out',
                    display: 'flex',
                    fontWeight: 400,
                  }}
                >
                  Try Again
                </Typography>
              </CustomButton>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

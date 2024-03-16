import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CustomButton, CustomModel, Status } from '@atoms';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IdentityGramLogo } from '@icons';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const ViewMonitoringModal = ({
  requestUrl,
  code,
  webHookSent,
  responseBody,
  requestBody,
}: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
        <VisibilityOutlinedIcon />
      </Box>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{
          maxHeight: '400px',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          width: { md: '55%', xs: '95%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 2,
          }}
        >
          <Image src={IdentityGramLogo} alt="IdentityGramLogo" />
          <CloseOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <Status
          title={'Expired'}
          color={'#B45050'}
          bgColor={'#FEE2E2'}
          styleWrapper={{ width: 'fit-content' }}
        />
        <Grid
          container
          sx={{
            border: '1px solid #E8E8EC',
            p: 2,
            mt: 3,
            borderRadius: '6px',
            width: '100%',
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'primary.light', fontWeight: 400 }}
            >
              Response:
            </Typography>
            <Status
              title={code == 200 ? code + ' Created' : code + ' Bad Request'}
              color={code === 200 ? '#065F46' : '#B45050'}
              bgColor={code === 200 ? '#D1FAE5' : '#FEE2E2'}
              styleWrapper={{
                width: 'fit-content',
                ml: { xs: 0, sm: 8 },
                mt: { xs: 2, sm: 0 },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'primary.light', fontWeight: 400, mr: 4 }}
            >
              Request URL:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.light',
                fontWeight: 400,
                ml: { xs: 0, sm: 2 },
                mt: { xs: 2, sm: 0 },
              }}
            >
              {requestUrl}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'primary.light', fontWeight: 400 }}
            >
              Webhook Sent:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.light',
                fontWeight: 400,
                ml: { xs: 0, sm: 4 },
                mt: { xs: 2, sm: 0 },
              }}
            >
              {webHookSent}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="h3">Request Body</Typography>
          <CustomButton
            fullWidth={false}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(requestBody));
            }}
          >
            Copy Code
          </CustomButton>
        </Box>
        <Grid
          container
          sx={{
            border: '1px solid #E8E8EC',
            p: 2,
            mt: 3,
            borderRadius: '6px',
            width: '100%',
          }}
        >
          <Grid item xs={12} mt={2}>
            <SyntaxHighlighter
              language="json"
              // style={coy}
              customStyle={{
                backgroundColor: '#f7f7f7',
                width: '100%',
                borderRadius: '8px',
              }}
            >
              {JSON.stringify(requestBody, null, 2)}
            </SyntaxHighlighter>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="h3">Response Body</Typography>
          <CustomButton
            fullWidth={false}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(responseBody));
            }}
          >
            Copy Code
          </CustomButton>
        </Box>
        <Grid
          container
          sx={{
            border: '1px solid #E8E8EC',
            p: 2,
            mt: 3,
            borderRadius: '6px',
            width: '100%',
          }}
        >
          <Grid item xs={12} mt={2}>
            <SyntaxHighlighter
              language="json"
              // style={tomorrow}
              customStyle={{
                backgroundColor: '#f7f7f7',
                width: '100%',
                borderRadius: '8px',
              }}
            >
              {JSON.stringify(responseBody, null, 2)}
            </SyntaxHighlighter>
          </Grid>
        </Grid>
      </CustomModel>
    </>
  );
};

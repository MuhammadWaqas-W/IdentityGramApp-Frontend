import { CustomButton, CustomTextField } from '@atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { rightArrow } from '@icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

let defaultValues = {
  firstName: '',
  lastName: '',
  orderName: '',
};

export const InstallationMol = ({ apiKey }: any) => {
  const [name, setName] = useState(true);
  const [uniqueIdentity, setUniqueIdentity] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    // resolver: yupResolver(""),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: any) => {};

  return (
    <Grid container mt={3}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ pr: 2, borderRight: '1px solid #E8E8EC' }}
      >
        <Typography
          variant="h3"
          sx={{ color: 'primary.dark', fontWeight: 600 }}
        >
          Install Identity Gram
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize', mt: 2 }}
        >
          Names Helps You Distinguish Between Different Integrations
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: 'primary.dark', fontWeight: 600 }}
          >
            First And Last Names
          </Typography>
          <Switch
            size="small"
            checked={name}
            onChange={(event) => setName(event.target.checked)}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize' }}
        >
          Select if you would like users to enter their first and last name
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'primary.dark',
              fontWeight: 600,
            }}
          >
            Unique Identifier
          </Typography>
          <Switch
            size="small"
            checked={uniqueIdentity}
            onChange={(event) => setUniqueIdentity(event.target.checked)}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize' }}
        >
          Select if you you would like users to enter a unique identifier.
        </Typography>
        <Box
          sx={{
            border: '1px solid #E8E8EC',
            backdropFilter: 'blur(17.5px)',
            borderRadius: '12px',
            mt: 4,
          }}
          p={3}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} p={2}>
                <Typography
                  variant="h4"
                  sx={{ color: 'primary.dark', fontWeight: 600 }}
                >
                  Verification Process
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.light',
                    textTransform: 'capitalize',
                    mt: 1,
                  }}
                >
                  Names helps you distinguish between different Integrations.
                </Typography>
              </Grid>
              {name && (
                <>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      type="text"
                      name={'firstName'}
                      id="firstName"
                      control={control}
                      fullWidth
                      labelText={'First Name'}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      type="text"
                      name={'lastName'}
                      id="lastName"
                      control={control}
                      fullWidth
                      labelText={'Last Name'}
                    />
                  </Grid>
                </>
              )}
              {uniqueIdentity && (
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    type="text"
                    name={'orderName'}
                    id="orderName"
                    control={control}
                    labelText={'Unique Identifier'}
                    fullWidth
                  />
                </Grid>
              )}
              <Grid item xs={12} mt={3}>
                <CustomButton
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  disabled={name || uniqueIdentity ? false : true}
                  EndIcon={<Image src={rightArrow} alt="rightArrow" />}
                >
                  Get Verfied
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} p={3}>
        <SyntaxHighlighter
          language="json"
          // style={coy}
          customStyle={{
            backgroundColor: '#f7f7f7',
            width: '100%',
            borderRadius: '8px',
          }}
        >
          {/* {JSON.stringify(
                <>
                  <script src='https://cdn.veriff.me/sdk/js/1.1/veriff.min.js'></script>
                  <script src='https://cdn.veriff.me/incontext/js/v1/veriff.js'></script>

                  <div id="veriff-root"></div>
                  <script>
                    const veriff = Veriff({
                      host: 'https://stationapi.veriff.com',
                      apiKey: apiKey,
                      parentId: 'veriff-root',
                      onSession: function (err: any, response: any) {
                         window?.veriffSDK?.createVeriffFrame({url: response?.veriff})                    
                      }
                    });
                    veriff.mount({
                      formLabel: {
                        vendorData: "Order number"
                      }
                    })
                  </script>
                </>,
              null,
              2,
            )} */}
        </SyntaxHighlighter>
      </Grid>
    </Grid>
  );
};

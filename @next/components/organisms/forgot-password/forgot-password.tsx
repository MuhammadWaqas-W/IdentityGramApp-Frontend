import React, { useEffect } from 'react';
import { CustomButton, CustomTextField } from '@atoms';
import { AuthCardMolecule, CustomMessage } from '@molecules';
import { messageIcon } from '@icons';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import router from 'next/router';
import { schemaForgotPassword } from './forgot-password.schema';
import { IForgotPasswordVal } from './forgot-password.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { apiPostRequest } from '@helpers';
import { endpoints } from '@config';

export const ForgotPasswordOrg = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = React.useState<any>({
    error: null,
    message: null,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPasswordVal>({
    resolver: yupResolver(schemaForgotPassword),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleForgotPassword: SubmitHandler<IForgotPasswordVal> = async (
    payload,
  ) => {
    try {
      const res: any = await apiPostRequest(endpoints?.forgotPassword, payload);
      const { data, status } = res;
      switch (status) {
        case 201:
        case 200:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          // router.push('/auth/reset-password');
          reset();
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error });
    } finally {
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setResponseMessage({ error: null, message: null });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [responseMessage]);

  return (
    <AuthCardMolecule>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 2, xl: 10 },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            color: 'primary.dark',
            fontSize: '36px',
            fontWeight: 600,
            textAlign: 'center',
            pt: { xs: 0, xl: 5 },
          }}
        >
          Forgot password?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            py: 2,
            fontWeight: 400,
            color: 'common.grayPurple',
          }}
        >
          Enter your registered email address to receive <br /> a reset password
          link
        </Typography>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <Grid
            container
            spacing={3}
            sx={{ display: 'block', mt: { xs: 0, md: 2 } }}
          >
            <Grid item lg={7} sx={{ margin: 'auto' }}>
              <CustomTextField
                fullWidth
                padding="15px 5px"
                placeholder="Email"
                type="text"
                StartIcon={
                  <Box sx={{ px: 2 }}>
                    <Image src={messageIcon} alt="" />
                  </Box>
                }
                name="email"
                id="email"
                control={control}
              />
            </Grid>
            <Grid item xs={7} sx={{ margin: 'auto' }}>
              <CustomMessage
                hasMessage={!!responseMessage?.message}
                text={responseMessage?.message}
                error={responseMessage?.error}
                isBold={true}
              />
            </Grid>
            <Grid item xs={7} sx={{ margin: 'auto' }}>
              <CustomButton padding="10px" type="submit" loading={isSubmitting}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  Send Link
                </Typography>
              </CustomButton>
            </Grid>
            <Grid item xs={7} sx={{ margin: 'auto', mt: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: { lg: 'end', md: 'center', xs: 'center' },
                  fontWeight: 400,
                  '& span': {
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: 'primary.dark',
                  },
                }}
              >
                Back to
                <span
                  onClick={() => {
                    router.push('/auth/login');
                  }}
                >
                  {' Login'}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthCardMolecule>
  );
};

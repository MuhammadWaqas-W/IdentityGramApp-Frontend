import { CustomButton, CustomTextField } from '@atoms';
import { endpoints } from '@config';
import { apiPostRequest } from '@helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { lockIcon } from '@icons';
import { AuthCardMolecule, CustomMessage } from '@molecules';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Image from 'next/image';
import router from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SchemaResetPassword } from './reset-password.schema';
import { IResetPasswordVal } from './reset-password.type';

export const ResetPasswordOrg = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = React.useState<any>({
    error: null,
    message: null,
  });
  const { userId, code } = router.query;

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IResetPasswordVal>({
    resolver: yupResolver(SchemaResetPassword),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleLoginSubmit: SubmitHandler<IResetPasswordVal> = async ({
    confirmPassword,
  }) => {
    try {
      const payload = {
        userId: userId,
        code: code,
        password: confirmPassword,
      };
      const res: any = await apiPostRequest(endpoints?.resetPassword, payload);
      const { data, status } = res;
      switch (status) {
        case 201:
        case 200:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          router?.push('/auth/login');
          reset();
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error });
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
          py: { xl: 10, xs: '10px' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            color: 'primary.dark',
            fontWeight: 600,
            textAlign: 'center',
            pt: 5,
          }}
          variant="h1"
        >
          Reset password
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
          Enter your new password
        </Typography>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Grid container spacing={3} sx={{ display: 'block', mt: 2 }}>
            <Grid item lg={7} sx={{ margin: 'auto' }}>
              <CustomTextField
                fullWidth
                padding="15px 5px"
                placeholder="New Password"
                StartIcon={
                  <Box sx={{ pr: 1 }}>
                    <Image src={lockIcon} alt="" />
                  </Box>
                }
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="password"
                name="newPassword"
                id="newPassword"
                control={control}
              />
            </Grid>
            <Grid item lg={7} sx={{ margin: 'auto' }}>
              <CustomTextField
                fullWidth
                padding="15px 5px"
                placeholder="Retype Password"
                StartIcon={
                  <Box sx={{ pr: 1 }}>
                    <Image src={lockIcon} alt="" />
                  </Box>
                }
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                control={control}
              />
            </Grid>
            <Grid item lg={7} sx={{ margin: 'auto' }}>
              <CustomMessage
                hasMessage={!!responseMessage?.message}
                text={responseMessage?.message}
                error={responseMessage?.error}
                isBold={true}
              />
            </Grid>
            <Grid item lg={7} sx={{ margin: 'auto' }}>
              <CustomButton padding="10px" type="submit" loading={isSubmitting}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  Reset Password
                </Typography>
              </CustomButton>
            </Grid>
            <Grid item lg={7} sx={{ margin: 'auto', mt: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'end',
                  fontWeight: 400,
                  '& span': {
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: 'primary.dark',
                  },
                }}
              >
                Back to{' '}
                <span
                  onClick={() => {
                    router.push('/auth/login');
                  }}
                >
                  Login
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthCardMolecule>
  );
};

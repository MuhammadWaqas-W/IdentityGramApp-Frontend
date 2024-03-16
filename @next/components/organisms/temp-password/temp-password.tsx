import React, { useEffect } from 'react';
import { CustomButton, CustomTextField } from '@atoms';
import { AuthCardMolecule, CustomMessage } from '@molecules';
import { lockIcon } from '@icons';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { endpoints } from '@config';
import { useSnackbar } from 'notistack';
import { SchemaTempPassword } from './temp-password.schema';
import { ITempPasswordVal } from './temp-password.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiPostRequest } from '@helpers';
import router from 'next/router';

export const TempPasswordOrg = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = React.useState<any>({
    error: null,
    message: null,
  });
  const { userId, code } = router?.query;

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ITempPasswordVal>({
    resolver: yupResolver(SchemaTempPassword),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleChangePassword: SubmitHandler<ITempPasswordVal> = async ({
    confirmPassword,
  }) => {
    try {
      let payload = {
        userId: userId,
        tempPassword: code,
        newPassword: confirmPassword,
      };
      const res: any = await apiPostRequest(endpoints?.tempPassword, payload);
      const { data, status } = res;
      switch (status) {
        case 201:
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
      <Box sx={{ py: { xs: 3, xl: 10 } }}>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            color: 'primary.dark',
            fontSize: '36px',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Change Password
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
          Enter your new password here
        </Typography>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Grid container spacing={3} sx={{ display: 'block', mt: 2 }}>
            <Grid item lg={7} sx={{ margin: 'auto' }}>
              <CustomTextField
                fullWidth
                padding="15px 5px"
                placeholder="New Password"
                StartIcon={
                  <Box sx={{ px: 2 }}>
                    <Image src={lockIcon} alt="" />
                  </Box>
                }
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'secondary.100',
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
                placeholder="Confirm Password"
                StartIcon={
                  <Box sx={{ px: 2 }}>
                    <Image src={lockIcon} alt="" />
                  </Box>
                }
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'secondary.100',
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
                  Change Password
                </Typography>
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthCardMolecule>
  );
};

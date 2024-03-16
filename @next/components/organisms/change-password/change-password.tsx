import { CustomButton, CustomTextField } from '@atoms';
import { lockIcon } from '@icons';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { endpoints } from '@config';
import { useSnackbar } from 'notistack';
import { schemaChangePassword } from './change-password.schema';
import { IChangePasswordVal } from './change-password.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiPostRequest } from '@helpers';
import { PrimaryCardAtom } from '@atoms';
import { CustomMessage } from '@molecules';

export const ChangePasswordOrganism = ({ outlet }: any): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = React.useState<any>({
    error: null,
    message: null,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IChangePasswordVal>({
    resolver: yupResolver(schemaChangePassword),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleChangePassword: SubmitHandler<IChangePasswordVal> = async ({
    currentPassword,
    confirmPassword,
  }) => {
    const payload = {
      oldPassword: currentPassword,
      newPassword: confirmPassword,
    };
    try {
      const res: any = await apiPostRequest(endpoints?.changePassword, payload);
      const { data, status } = res;
      switch (status) {
        case 201:
        case 200:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
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
    <PrimaryCardAtom xs={12} sm={10} lg={8} xl={6}>
      <Box sx={{ py: 4 }}>
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
                placeholder="Current Password"
                StartIcon={
                  <Box sx={{ px: 2 }}>
                    <Image src={lockIcon} alt="" />
                  </Box>
                }
                styleTextField={{
                  backgroundColor: 'common.lightShadow',
                }}
                type="password"
                name="currentPassword"
                id="currentPassword"
                control={control}
              />
            </Grid>
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
                  backgroundColor: 'common.lightShadow',
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
                  backgroundColor: 'common.lightShadow',
                }}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
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
    </PrimaryCardAtom>
  );
};

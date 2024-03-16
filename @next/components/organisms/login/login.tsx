import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { lockIcon, messageIcon } from '@icons';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTextField, CustomButton, CustomCheckBox } from '@atoms';
import { AuthCardMolecule, CustomMessage } from '@molecules';
import { IFormValuesType } from './login.types';
import { schema } from './login.schema';
import router from 'next/router';
import { login } from '@store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '@hooks';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@utils';

export const LoginOrganism = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  let data = getLocalStorage('rememberMe');

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormValuesType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: data?.email || '',
      password: data?.password || '',
      loggedIn: data?.loggedIn || true,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleLoginSubmit: SubmitHandler<IFormValuesType> = async ({
    email,
    password,
    loggedIn,
  }) => {
    try {
      loggedIn
        ? setLocalStorage('rememberMe', { email, password, loggedIn })
        : removeLocalStorage('rememberMe');
      // const response = await dispatch(login({ email, password }));
      // const { data, status } = unwrapResult(response);
      const status = 201;
      const data = { message: 'success' };
      switch (201) {
        case 201:
          if (
            password == process.env.NEXT_PUBLIC_PASSWORD &&
            email == process.env.NEXT_PUBLIC_EMAIL
          ) {
            router?.push('/app/dashboard');
            enqueueSnackbar('Login Successfully', {
              variant: 'success',
            });
            return false;
          } else {
            enqueueSnackbar('Wrong Credential', {
              variant: 'error',
            });
          }
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error?.message });
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
      <Typography
        sx={{
          fontFamily: 'Poppins',
          color: 'primary.dark',
          fontSize: '36px',
          fontWeight: 600,
          textAlign: 'center',
          pt: { xs: 1, xl: 5 },
          '& span': {
            color: 'primary.main',
          },
        }}
      >
        Login to <span>Identity Gram</span>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          py: { xs: 0, xl: 2 },
          fontWeight: 400,
          color: 'text.primary',
        }}
      >
        Kindly enter your details below to Login
      </Typography>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <Grid
          container
          spacing={3}
          sx={{ display: 'block', mt: { xs: 0, xl: 2 } }}
        >
          <Grid item lg={7} sx={{ margin: 'auto' }}>
            <CustomTextField
              fullWidth
              padding="15px 5px"
              placeholder="Email"
              type="text"
              StartIcon={
                <Box sx={{ pr: 1 }}>
                  <Image src={messageIcon} alt="" />
                </Box>
              }
              name="email"
              id="email"
              control={control}
              styleTextField={{
                fontSize: '14px',
                backgroundColor: 'secondary.100',
              }}
            />
          </Grid>
          <Grid item lg={7} sx={{ margin: 'auto' }}>
            <CustomTextField
              fullWidth
              padding="15px 5px"
              placeholder="Password"
              StartIcon={
                <Box sx={{ pr: 1 }}>
                  <Image src={lockIcon} alt="" />
                </Box>
              }
              styleTextField={{
                fontSize: '14px',
                backgroundColor: 'secondary.100',
              }}
              type="password"
              name="password"
              id="password"
              control={control}
            />
          </Grid>
          <Grid item lg={7} sx={{ margin: 'auto' }}>
            <Box
              sx={{
                my: { xs: 0, xl: 2 },
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'space-between' },
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
              }}
            >
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
                name="loggedIn"
                control={control}
                label="Keep me Logged in"
              />
              <Link href={'/auth/forgot-password'} style={{ color: '#6E7191' }}>
                Forgot Password?
              </Link>
            </Box>
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
            <CustomButton type="submit" padding="10px" loading={isSubmitting}>
              <Typography
                variant="h6"
                sx={{
                  transition: 'all .2s ease-in-out',
                  display: 'flex',
                  fontWeight: 400,
                  '& span': {
                    display: 'flex',
                    '& :hover': {
                      transform: 'scale(1.3)',
                    },
                  },
                }}
              >
                Login Now
                <span>
                  <ArrowForwardIcon sx={{ mx: 1 }} />
                </span>
              </Typography>
            </CustomButton>
          </Grid>
          <Grid
            item
            lg={7}
            sx={{ margin: 'auto', mt: 2, pb: { xs: 1, xl: 5 } }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'common.grayPurple',
                textAlign: 'center',
                fontWeight: 400,
                '& span': {
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: 'primary.dark',
                },
              }}
            >
              Don’t have an account? {''}
              <span
                onClick={() => {
                  router?.push('/auth/signup');
                }}
              >
                Sign Up
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </AuthCardMolecule>
  );
};

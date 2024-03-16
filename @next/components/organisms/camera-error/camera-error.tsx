import React, { useEffect, useState } from 'react';
import { IndentityLogo } from '@icons';
import { LinkViaSms } from '@molecules';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@hooks';
import { apiPostRequest } from '@helpers';
import { endpoints } from '@config';
import { useSnackbar } from 'notistack';
import { SubmitHandler } from 'react-hook-form';
import { REQUEST_STATUS } from '@constants';
import { useRouter } from 'next/router';
import { backIcon } from '@icons';

export const CameraErrorOrg = () => {
  const router = useRouter();
  const { verifcationProccessResponseData } = useAppSelector(
    (store) => store.verification,
  );
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const sendLinkHanlder = async ({ type, value }: any) => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);

    const payload = {
      type,
      value: String(value),
      verificationId: verifcationProccessResponseData?._id,
    };
    try {
      const res: any = await apiPostRequest(
        endpoints?.sendVerificationLink,
        payload,
      );
      const { data, status } = res;
      switch (status) {
        case 200:
        case 201:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          setRequestStatusGet(REQUEST_STATUS.SUCCESS);

          break;
        default:
          setRequestStatusGet(REQUEST_STATUS.FAILURE);
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
      setResponseMessage({ error: true, message: error?.message });
    }
  };
  const handleSentLinkViaSms: SubmitHandler<any> = (formData) => {
    sendLinkHanlder(formData);
  };
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setResponseMessage({ error: null, message: null });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [responseMessage]);
  return (
    <Box
      sx={{
        pt: 4,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Image src={IndentityLogo} alt="" priority={false} />
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'primary.dark',
              textAlign: 'center',
              pt: { xs: 1, md: 8 },
            }}
          >
            Camera Not Active
          </Typography>
          <Box
            onClick={() =>
              router.push({
                pathname: '/app/verifications/verification-session',
                query: {
                  keyword: verifcationProccessResponseData?.linkCode,
                },
              })
            }
            sx={{ ml: 10, cursor: 'pointer' }}
          >
            <Image src={backIcon} alt="" />
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: 'primary.light',
            textAlign: 'center',
            py: 4,
          }}
        >
          A working camera is required to continue verification. Try using a
          different device.
        </Typography>
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '80%',
              md: '70%',
              xl: '65%',
              margin: 'auto',
            },
          }}
        >
          <Grid container spacing={5} sx={{ pt: { xs: 1, md: 5 } }}>
            <Grid
              item
              sm={12}
              lg={6}
              sx={{
                display: { xs: 'block', lg: 'flex' },
                justifyContent: 'center',
                ml: { xs: 2, md: 0 },
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.dark',
                    pb: 1,
                  }}
                >
                  1. Scan QR Code
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'primary.light',
                    pb: 1,
                  }}
                >
                  Scan the QR Code with your Device camera
                </Typography>
                <Box
                  className="animation-div-parent"
                  sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                >
                  <Box className="conatiner">
                    <Box className="border">
                      <Box className="qrcode" sx={{}}>
                        <Image
                          src={verifcationProccessResponseData?.qrImage}
                          alt=""
                          width={160}
                          height={160}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              sm={12}
              lg={6}
              sx={{
                width: '100%',
                px: 2,
                ml: { xs: 2, md: 0 },
                display: { xs: 'block', lg: 'flex' },
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: 'primary.dark', textAlign: 'left' }}
              >
                2. Send link via SMS
              </Typography>
              <LinkViaSms
                handleSentLinkViaSms={handleSentLinkViaSms}
                responseMessage={responseMessage}
              />
            </Grid>
            <Grid
              item
              sm={12}
              lg={12}
              sx={{
                ml: { xs: 2, lg: 5, xl: 17 },
              }}
            ></Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

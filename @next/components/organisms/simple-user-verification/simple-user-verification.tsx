import React, { useEffect, useState } from 'react';
import { CustomButton, CustomModel } from '@atoms';
import { Box, Grid } from '@mui/material';
import { copyLinkIcon, sendIcon } from '@icons';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { apiPostRequest } from '@helpers';
import { endpoints } from '@config';
import { folderGif, laptopGif, appStore, playStore } from 'public/images';
import { LinkViaEmail, LinkViaSms } from '@molecules';

export const SimpleUserVerification = ({ verificationResponseData }: any) => {
  const [method, setMethod] = React.useState('sms');
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });

  const sendLinkHanlder = async ({ type, value }: any) => {
    const payload = {
      type,
      value: String(value),
      verificationId: verificationResponseData?._id,
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

  const handleSentLinkViaEmail: SubmitHandler<any> = (formData) => {
    sendLinkHanlder(formData);
  };

  const handleSentLinkViaSms: SubmitHandler<any> = (formData) => {
    sendLinkHanlder(formData);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <Box sx={{ cursor: 'pointer' }} onClick={handleOpen}>
        <Image src={sendIcon} alt="" />
      </Box>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{
          width: { xs: '90%', sm: '80%', md: '70%', xl: '65%' },
          py: 4,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            overflowY: { xs: 'scroll', lg: 'revert' },
            height: { xs: 650, lg: 'fit-content' },
          }}
        >
          <Grid item xs={6}>
            <Typography
              sx={{
                color: 'primary.dark',
                fontSize: '24px',
                fontWeight: 500,
              }}
            >
              Let's get you verified
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'end' }}>
            <CloseIcon
              sx={{
                fontFamily: 'Poppins',
                color: 'primary.light',
                fontSize: '24px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={() => setOpen(false)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', pb: 1 }}>
              <Image
                src={folderGif}
                alt=""
                style={{ width: '58px', height: '58px' }}
              />
              <Box sx={{ pl: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.dark',
                    pb: 1,
                  }}
                >
                  Prepare a Valid Document
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'primary.light',
                    pb: 2,
                  }}
                >
                  Make Sure It's Not Expired Or physically Damaged
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: 'primary.dark',
                pb: 1,
              }}
            >
              Download Mobile App
            </Typography>
            <Box
              sx={{
                pt: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box>
                <Image src={appStore} alt="" />
              </Box>
              <Box sx={{ pl: 4 }}>
                <Image src={playStore} alt="" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex' }}>
              <Image
                src={laptopGif}
                alt=""
                style={{ width: '58px', height: '58px' }}
              />
              <Box sx={{ pl: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.dark',
                    pb: 1,
                  }}
                >
                  Use A Smartphone
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'primary.light',
                  }}
                >
                  You Need A Smartphone In Order in Order To Continue
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 2 }}>
              <Box sx={{ pr: 2, cursor: 'pointer' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: method === 'sms' ? 500 : 400,
                    color: method === 'sms' ? 'primary.dark' : 'primary.light',
                  }}
                  onClick={() => setMethod('sms')}
                >
                  Send link via SMS
                </Typography>
              </Box>
              <Box
                sx={{
                  pl: 2,
                  borderLeft: { lg: '2px solid #E8E8EC', md: 'none' },
                  cursor: 'pointer',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: method === 'email' ? 500 : 400,
                    color:
                      method === 'email' ? 'primary.dark' : 'primary.light',
                  }}
                  onClick={() => setMethod('email')}
                >
                  Send link via Email
                </Typography>
              </Box>
            </Box>
            {method === 'email' ? (
              <LinkViaEmail
                handleSentLinkViaEmail={handleSentLinkViaEmail}
                responseMessage={responseMessage}
              />
            ) : (
              <LinkViaSms
                handleSentLinkViaSms={handleSentLinkViaSms}
                responseMessage={responseMessage}
              />
            )}
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', pt: 10 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.light',
              }}
            >
              Read more about our personal data processing in Identity Gram’s
              <Link href={'#'} style={{ color: '#3C347E', paddingLeft: 5 }}>
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.light',
              }}
            >
              Don’t have a smartphone?
              <Link
                href={{
                  pathname: '/app/verifications/verification-session',
                  query: { keyword: verificationResponseData?.linkCode },
                }}
                style={{ color: '#3C347E', paddingLeft: 5 }}
              >
                Continue with your current device
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </CustomModel>
    </React.Fragment>
  );
};

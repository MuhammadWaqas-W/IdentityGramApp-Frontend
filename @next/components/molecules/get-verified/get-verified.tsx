import React from 'react';
import { CustomButton } from '@atoms';
import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { folderGif, laptopGif, copyLinkIcon } from 'public/images';
import { LinkViaSms, LinkViaEmail } from '@molecules';
import { SubmitHandler } from 'react-hook-form';
import { apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';
import { endpoints } from '@config';

export const GetVerifiedMolecule = ({ verificationResponseData }: any) => {
  const [method, setMethod] = React.useState('sms');
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const path =
    'https://app-dev.identitygram.co.uk/app/verifications/verification-session?keyword=';

  const copyLinkContent = () => {
    navigator.clipboard.writeText(
      `${path}${verificationResponseData?.linkCode}`,
    );
  };

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

  return (
    <React.Fragment>
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
              Make Sure It's Not Expired Or Physically Damaged
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
          Share Link
        </Typography>
        <Box sx={{ pb: 2, display: 'flex', alignItems: 'center' }}>
          <Link
            style={{
              cursor: 'pointer',
              color: '#645CAA',
              textDecoration: 'none',
              maxWidth: '400px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            href="#"
          >
            {`https://app-dev.identitygram.co.uk/app/verifications/verification-session?keyword=${verificationResponseData?.linkCode}`}
          </Link>
          <CustomButton
            borderColor="transparent"
            variant="outlined"
            background="transparent"
            onClick={copyLinkContent}
            fullWidth={false}
            padding={0.8}
          >
            <Image src={copyLinkIcon} alt="" />
          </CustomButton>
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: 'primary.dark',
            pb: 1,
          }}
        >
          Scan QR Code
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
        <Box className="animation-div-parent" sx={{ mt: 2 }}>
          <Box className="conatiner">
            <Box className="border">
              <Box className="qrcode">
                <Image
                  src={verificationResponseData?.qrImage}
                  alt=""
                  width={160}
                  height={160}
                />
              </Box>
            </Box>
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
                color: method === 'email' ? 'primary.dark' : 'primary.light',
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
    </React.Fragment>
  );
};

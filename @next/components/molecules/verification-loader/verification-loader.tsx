import React, { useEffect, useState } from 'react';
import { IndentityLogo } from '@icons';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { checkingGif } from 'public/images';
import { useRouter } from 'next/router';
import { tickGif, completed } from 'public/images';
import Link from 'next/link';
import { CustomButton } from '@atoms';

const verificationData: any = [
  {
    id: 1,
    name: 'Photos processed',
  },
  {
    id: 2,
    name: 'Image quality Checked',
  },
  {
    id: 3,
    name: 'Documents inspected',
  },
  {
    id: 4,
    name: 'Finalizing the decision',
  },
];

export const VerificationLoader = () => {
  const [numbers, setNumbers] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    let timer: any = null;
    const addNumber = (num: any) => {
      setNumbers((prevNumbers: any) => [...prevNumbers, num]);
      if (num < 5) {
        timer = setTimeout(() => addNumber(num + 1), 3000);
      }
    };
    addNumber(1);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (numbers.length === 5)
    return (
      <Box
        sx={{
          height: '96vh',
          display: 'flex',
          justifyContent: 'center',
          pt: 3,
        }}
      >
        <Box>
          <Box sx={{ textAlign: 'center' }}>
            <Image src={IndentityLogo} alt="" />
          </Box>
          <Box sx={{ textAlign: 'center', pt: 5 }}>
            <Image src={completed} alt="" width={382} height={382} />
          </Box>
          <Typography
            sx={{
              fontSize: '36px',
              textAlign: 'center',
              fontWeight: 400,
              pt: 3,
              color: 'primary.dark',
            }}
          >
            Thank You !
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',

              pt: 3,
              color: 'primary.light',
            }}
          >
            Your Verification data has been successfully submitted
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <CustomButton
              maxWidth="330px"
              padding="10px"
              margin="50px 0"
              onClick={() => router.push('/app/verifications')}
            >
              <Typography
                variant="h6"
                sx={{
                  transition: 'all .2s ease-in-out',
                  display: 'flex',
                  fontWeight: 400,
                }}
              >
                Continue
              </Typography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    );
  return (
    <Box
      sx={{
        height: '96vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pt: 3,
      }}
    >
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Image src={IndentityLogo} alt="" priority={false} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Image src={checkingGif} alt="" width={138} height={138} />
        </Box>
        <Typography
          sx={{
            fontSize: '36px',
            textAlign: 'center',
            fontWeight: 400,
            pt: 3,
            color: 'primary.dark',
          }}
        >
          Please Wait...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
          <Box>
            {verificationData.map((item: any) => (
              <Box key={item.name} sx={{ display: 'flex', py: 2 }}>
                <Box sx={{ width: '24px', height: '24px' }}>
                  {numbers.map(
                    (number: any) =>
                      number === item.id && (
                        <Image
                          key={number}
                          src={tickGif}
                          alt=""
                          style={{ width: '24px', height: '24px' }}
                        />
                      ),
                  )}
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.9,
                    pl: 1,
                    color: 'primary.light',
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          py: 4,
          color: 'primary.light',
        }}
      >
        Your session audio and video may be recorded. <br />
        Read more from Identity Gram’s
        <Link
          href={'#'}
          style={{
            color: '#3C347E',
            textDecoration: 'none',
            fontWeight: 500,
            paddingLeft: 5,
          }}
        >
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

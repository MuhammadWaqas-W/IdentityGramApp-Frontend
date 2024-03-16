import React, { useEffect, useState } from 'react';
import { IndentityLogo } from '@icons';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { SessionStartMol } from '@molecules';
import { ChooseDocumentForVerification } from '@molecules';

export const VerificationSessionOrg = () => {
  const [sessionStart, setSessionStart] = useState<boolean>(false);
  const [browserName, setBrowserName] = useState<string | false>('unknown');
  const [osName, setOsName] = useState<string | boolean>('unknown');

  useEffect(() => {
    // Get browser name
    const userAgent = navigator?.userAgent?.toLowerCase();
    const browsers = [
      'chrome',
      'firefox',
      'safari',
      'opera',
      'msie',
      'trident',
    ];
    for (let i = 0; i < browsers?.length; i++) {
      setBrowserName(userAgent?.indexOf(browsers[i]) > -1 && browsers[i]);
      break;
    }

    // Get OS name
    const { platform } = navigator;
    setOsName(platform?.indexOf('win') > -1 && 'Windows');
    setOsName(platform?.indexOf('mac') > -1 && 'macOS');
    setOsName(platform?.indexOf('linux') > -1 && 'Linux');
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        pt: 4,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Image src={IndentityLogo} alt="" priority={false} />
      </Box>
      {!sessionStart ? (
        <SessionStartMol
          startSession={(val: any) => setSessionStart(val)}
          browserName={browserName}
          osName={osName}
        />
      ) : (
        <ChooseDocumentForVerification />
      )}

      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          pt: 4,
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

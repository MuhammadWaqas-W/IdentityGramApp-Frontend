import React from 'react';
import { IndentityLogo } from '@icons';
import { Box, Typography } from '@mui/material';
import { PrimaryCardAtom } from '@atoms';
import Image from 'next/image';
import { AuthCardTypes } from './login-form-molecule.types';

export const AuthCardMolecule: React.FC<AuthCardTypes> = ({
  children,
}: AuthCardTypes) => {
  return (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ textAlign: 'center', py: { xs: 0, md: 5 } }}>
        <Image
          src={IndentityLogo}
          alt=""
          width={200}
          height={100}
          priority={false}
        />
      </Box>
      <PrimaryCardAtom
        xs={11}
        md={8}
        xl={6}
        StyleObject={{ height: 'fit-content' }}
      >
        {children}
      </PrimaryCardAtom>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          p: 4,
          fontWeight: 300,
          lineHeight: '24px',
          color: 'common.darkGreen',
        }}
      >
        Copyrights © 2023 All Rights Reserved by Identity Gram
      </Typography>
    </Box>
  );
};

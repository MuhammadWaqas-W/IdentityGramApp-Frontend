import React from 'react';
import { companyAdminIcon, superAdmin, userIcon } from '@icons';
import { Box, Typography } from '@mui/material';
import { PrimaryCardAtom } from '@atoms';
import Image from 'next/image';
import { AuthCardMolecule } from '@molecules';

const useTypeData: any = [
  {
    id: 1,
    name: 'Simple \n User',
    img: userIcon,
  },
  {
    id: 2,
    name: `Company \n Admin`,
    img: companyAdminIcon,
  },
  {
    id: 3,
    name: 'Super \n Admin',
    img: superAdmin,
  },
];

export const AuthSelectUser = () => {
  return (
    <AuthCardMolecule>
      <Box
        sx={{
          minHeight: '100%',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            color: 'primary.dark',
            fontSize: '36px',
            fontWeight: 600,
            textAlign: 'center',
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
            py: 2,
            fontWeight: 400,
            color: 'common.grayPurple',
          }}
        >
          Select User Type
        </Typography>
        <Box
          className="card"
          sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 10 }}
        >
          {useTypeData.map((item: any) => (
            <PrimaryCardAtom
              key={item.id}
              StyleObject={{
                Width: '240px',
                height: '280px',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all .2s ease-in-out',
                justifyContent: 'space-evenly',
                '&:hover': {
                  transform: 'scale(1.04)',
                  '& span': {
                    transform: 'scale(1.04)',
                  },
                  '& .MuiTypography-root': {
                    textDecoration: 'underline',
                    transform: 'scale(1.04)',
                  },
                },
              }}
            >
              <Image src={item.img} alt="" />
              <Typography
                variant="h2"
                sx={{
                  whiteSpace: 'pre-line',
                  color: 'common.grayPurple',
                }}
              >
                {item.name}
              </Typography>
            </PrimaryCardAtom>
          ))}
        </Box>
      </Box>
    </AuthCardMolecule>
  );
};

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { userTestimonials } from '@constants';

export const UserDashboardTestimonial = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {userTestimonials.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Box
                sx={{
                  py: 4,
                  background: `${item.bgColor}`,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover img': {
                    transform: 'scale(1.5)',
                    transitionDelay: '0.3s',
                  },
                  '&:hover h6': {
                    transitionDelay: '0.3s',
                    transform: 'translateY(5px)',
                  },
                }}
              >
                <Box>
                  <Image src={item.icon} alt={item.Alt} />
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      transition: ' 0.3s ease-in-out',
                      fontSize: '16px',
                      fontWeight: '400',
                      color: 'primary.light',
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

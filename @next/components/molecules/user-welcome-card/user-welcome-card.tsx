import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { gif, gifbg } from '@images';
import { useAppSelector } from '@hooks';

export const UserWelcomeCard = () => {
  const theme = useTheme();
  const { profileData } = useAppSelector((store) => store.profile);

  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={12}
        sx={{
          background: '#FBFBFC',
          borderRadius: '14px',
          color: '#6E7191',
          position: 'relative',
          minHeight: '217px',
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'flex-start' },
          '@media (max-width:640px)': {
            mt: 5,
          },
        }}
      >
        <Box sx={{ p: 2, zIndex: 1 }}>
          <Typography variant="h5" sx={{ color: 'primary.light', mb: 2 }}>
            Hi, {profileData.firstName + ' ' + profileData.lastName}
          </Typography>

          <Typography variant="h2" sx={{ color: '#3C347E', mb: 2 }}>
            Welcome to Identity Gram
          </Typography>

          <Typography
            variant="h5"
            paragraph
            sx={{ color: 'primary.light', wordBreak: 'break-word' }}
          >
            Click on the notification section to get started with the new
            verification
            <br /> request or visit verification section.
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: '60px',
            bottom: '100px',
            '@media (max-width:640px)': {
              right: '5px',
            },
          }}
        >
          <Image src={gifbg} alt="gif" width={203} height={109} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: '-8px',
            bottom: '0px',
            '@media (max-width:640px)': {
              display: 'none',
            },
          }}
        >
          <Image src={gif} alt="gif" width={266} height={213} />
        </Box>
      </Grid>
    </Grid>
  );
};

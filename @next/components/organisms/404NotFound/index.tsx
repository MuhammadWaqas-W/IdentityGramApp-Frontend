import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import router from 'next/router';
import Image from 'next/image';
import { NotFound } from '@svgs';

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(3),
//     paddingTop: 80,
//     paddingBottom: 80,
//   },
//   image: {
//     maxWidth: '100%',
//     width: 560,
//     maxHeight: 300,
//     height: 'auto',
//   },
// }));

export const Error404View = () => {
  //   const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme?.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <Typography
        align="center"
        variant={mobileDevice ? 'h4' : 'h1'}
        color="textPrimary"
      >
        404: The page you are looking for isn’t here
      </Typography>
      <Typography align="center" variant="subtitle2" color="textSecondary">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation.
      </Typography>
      <Box mt={6} display="flex" justifyContent="center">
        <Image
          alt="Under development"
          width={500}
          height={300}
          src={NotFound}
        />
      </Box>
      <Box mt={6} display="flex" justifyContent="center">
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => router?.push('./dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default Error404View;

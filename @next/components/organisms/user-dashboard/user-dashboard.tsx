import { Box, Grid } from '@mui/material';
import {
  DocumentTypeCard,
  UserDashboardTestimonial,
  UserRecentVerifications,
  UserVerificationStatusGraph,
  UserWelcomeCard,
} from '@molecules';

export const UserDashboardOrganism = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid item container spacing={2}>
        <Grid item xs={12} xl={8}>
          <UserWelcomeCard />
          <Grid container spacing={2} sx={{ display: 'flex', mt: 2 }}>
            <Grid item xs={12} xl={5}>
              <UserVerificationStatusGraph />
            </Grid>

            <Grid item xs={12} xl={7}>
              <DocumentTypeCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} xl={4}>
          <UserRecentVerifications />
        </Grid>
        <Grid item xs={12} xl={10}>
          <UserDashboardTestimonial />
        </Grid>
      </Grid>
    </Box>
  );
};

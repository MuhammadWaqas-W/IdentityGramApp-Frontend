import React, { useCallback, useEffect } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Hidden,
  Toolbar,
  SvgIcon,
  Grid,
  keyframes,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PageName } from '@molecules';
import Image from 'next/image';
import { profilePic } from '@images';
import {
  AccountDetailsOrganism,
  SlideDrawerOrganism,
  NotificationsOrganism,
} from '@organisms';
import { CustomTextField } from '@atoms';
import { bell, searchIcon } from '@icons';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getNotification, getProfileData } from '@store';
import { awsBaseUrl } from '@config';

interface PropsType {
  onMobileNavOpen: any;
}

const blinker = keyframes`
0% { opacity: 1.0; }
50% { opacity: 0.0; }
100% { opacity: 1.0; }
`;

export const UserHeader = ({ onMobileNavOpen }: PropsType): JSX.Element => {
  const [accountDetails, setAccountDetails] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const { profileData, profilePicture } = useAppSelector(
    (store: any) => store.profile,
  );
  const { profileImage } = profileData;
  const dispatch = useAppDispatch();
  const { latestNotification } = useAppSelector(
    (store: any) => store.notification,
  );
  let profileImg =
    (profileImage || profilePicture) &&
    awsBaseUrl + (profilePicture || profileImage);

  // START GET API CALL FOR PROFILE DATA
  const getProfileInfo = useCallback(async () => {
    try {
      await dispatch(getProfileData());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);
  // END GET API CALL FOR PROFILE DATA

  // START GET API CALL FOR LATEST NOTIFICATIONS
  const getLatestNotification = useCallback(async () => {
    try {
      await dispatch(getNotification());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getLatestNotification();
  }, [getLatestNotification]);
  // END GET API CALL FOR LATEST NOTIFICATIONS

  return (
    <AppBar
      elevation={0}
      sx={{
        maxWidth: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Toolbar sx={{ color: '#8B8B8B', p: 2 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={0} sm={0} md={3} lg={2} xl={1.5} mr="10px">
            <Hidden mdUp>
              <IconButton color="inherit" onClick={onMobileNavOpen}>
                <SvgIcon fontSize="small">
                  <MenuIcon />
                </SvgIcon>
              </IconButton>
            </Hidden>
          </Grid>
          <Grid
            item
            container
            xs={10}
            sm={11}
            md={12}
            lg={12}
            sx={{
              ml: { xl: '220px', lg: '220px', md: '220px' },
              mr: { xl: '20px', lg: '20px', md: '20px' },
              display: 'flex',
              justifyContent: { xs: 'flex-end', sm: 'space-between' },
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <PageName />
            </Box>
            <Box
              sx={{
                backgroundColor: 'white',
                // boxShadow: (theme) => theme.customShadows.primary,
                boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
              }}
            >
              {/* <CustomTextField
                placeholder="Search"
                type="text"
                StartIcon={
                  <>
                    <Image src={searchIcon} alt="" />
                  </>
                }
                name="email"
                id="email"
                styleTextField={{
                  fontSize: '1px',
                  backgroundColor: 'customShadows.primary',
                  '& .Mui-focused': {
                    boxShadow: 'none !important',
                  },
                  '& fieldset': {
                    border: 'none !important',
                    boxShadow: 'none !important',
                  },
                }}
              />  */}
              <Box sx={{ position: 'relative', display: 'flex' }}>
                <Image
                  src={bell}
                  alt="Profile Image"
                  height={18}
                  width={18}
                  onClick={() => setNotification(true)}
                  style={{
                    marginLeft: '10px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                />
                {!!latestNotification?.length && (
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '10px',
                      animation: `${blinker} 2s linear infinite`,
                      backgroundColor: 'red',
                      marginRight: '5px',
                      position: 'absolute',
                      top: -6,
                      right: 2,
                    }}
                  ></Box>
                )}
              </Box>
              <Image
                src={profilePic}
                alt="Profile Image"
                height={30}
                width={30}
                style={{
                  marginLeft: '6px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                onClick={() => setAccountDetails(true)}
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>

      <SlideDrawerOrganism
        open={accountDetails}
        toggleDrawer={() => setAccountDetails(!accountDetails)}
        accountDetail
      >
        <AccountDetailsOrganism setOpen={setAccountDetails} />
      </SlideDrawerOrganism>
      <SlideDrawerOrganism
        open={notification}
        toggleDrawer={() => setNotification(!notification)}
      >
        <NotificationsOrganism closeNotification={setNotification} />
      </SlideDrawerOrganism>
    </AppBar>
  );
};

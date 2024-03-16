import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Drawer, Hidden, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SidebarLogo } from '@images';
import {
  companyRoles,
  navConfig,
  navConfigCompany,
  navConfigUser,
} from '@constants';
import { PropsType } from './user-sidbar.types';
import { authActions } from '@store';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useSnackbar } from 'notistack';
import { CustomButton } from '@atoms';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 230,
    backgroundColor: '#645CAA',
  },
  desktopDrawer: {
    top: 0,
    width: 230,
    height: '100%',
    backgroundColor: '#645CAA',
    // height: 'calc(100% - 64px)',
  },
}));

export const UserSidebar = ({
  openMobile,
  onMobileClose,
}: PropsType): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { pathname } = router;
  const lastRoute = pathname.split('/')?.pop()?.toLocaleLowerCase();
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];
  const [sideMenu, setSideMenu] = useState<any>(navConfig);

  useEffect(() => {
    if (companyRoles.includes(role)) {
      setSideMenu(navConfigCompany);
    } else if (role === 'SUPER_ADMIN') {
      setSideMenu(navConfig);
    } else if (role === 'SIMPLE_USER') {
      setSideMenu(navConfigUser);
    }
  }, [role]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);

  const handleLogout = async () => {
    try {
      dispatch(authActions.logout());
      router.push('/auth/login');
    } catch (error) {
      enqueueSnackbar('Unable to logout', {
        variant: 'error',
      });
    }
  };

  const content = (
    <Box
      height="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: false }}>
        <Box p={5} display="flex" justifyContent="center">
          <Link href="/app/dashboard">
            <Box
              sx={{
                cursor: 'pointer',
              }}
            >
              <Image src={SidebarLogo} alt="Indentity Gram" />
            </Box>
          </Link>
        </Box>
        {/* <Divider /> */}
        <Box
          p={'0px  24px 5px'}
          sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}
        >
          {sideMenu.map((config: any) => (
            <Box
              key={config.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '6px',
                backgroundColor:
                  lastRoute == config?.value.toLocaleLowerCase() ||
                  pathname?.includes(config?.value.toLocaleLowerCase())
                    ? '#766CB5'
                    : '',
              }}
            >
              <Link
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'Popins',
                  fontWeight: '500',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  // padding: '10px 22px 15px 0px',
                }}
                passHref
                href={config.href}
              >
                <Image src={config?.icon} height={24} width={24} alt="icon" />
                <Typography sx={{ pl: 1 }}>{config?.title}</Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
          mb: 5,
          width: '80%',
          color: 'white',
          fontSize: '16px',
          fontWeight: '500',
          borderRadius: '5px',
          fontFamily: 'Poppins',
          backgroundColor: '#766CB5',
        }}
      >
        <CustomButton
          background="transparent"
          backgroundHover="transparent"
          onClick={handleLogout}
          fullWidth={false}
          StartIcon={<LogoutIcon />}
        >
          Logout
        </CustomButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

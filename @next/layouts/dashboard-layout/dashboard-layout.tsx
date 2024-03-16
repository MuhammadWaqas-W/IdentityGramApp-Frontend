import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { UserSidebar, UserHeader, UserFooter } from '@organisms';
import { AuthGuard } from '@utils';

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'white',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 50,
    marginTop: 50,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256,
      paddingRight: 25,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
    [theme.breakpoints.down('md')]: {
      paddingRight: 25,
      paddingLeft: 25,
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      paddingRight: 5,
      paddingLeft: 5,
    },
  },
  mainArea: {
    height: '84vh',
    overflowY: 'auto',
    padding: '10px',
    '&::-webkit-scrollbar': { width: '7px', cursor: 'pointer', height:'6px' },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#645CAA',
      borderRadius: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  footerArea: {
    height: '5vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
}));

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AuthGuard>
      <div className={classes.root}>
        <UserHeader onMobileNavOpen={() => setMobileNavOpen(true)} />
        <UserSidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <div className={classes.mainArea}>{children}</div>
              <div className={classes.footerArea}>
                <UserFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

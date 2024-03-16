import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { ListItem, colors, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { navItem } from './nav-item.types';

const useStyles = makeStyles((theme) => ({
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: 'white',
    // color: theme?.palette?.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  buttonLeaf: {
    color: 'white',
    padding: '15px 2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
    textDecoration: 'none',
    letterSpacing: 0,
    width: '100%',
    fontSize: 15,
    // fontWeight: theme?.typography?.fontWeightRegular as any,
    '&.depth-0': {
      '& $title': {
        // fontWeight: theme?.typography?.fontWeightMedium,
      },
    },
    cursor: 'pointer',
  },
  icon: {
    fontSize: 20,
    marginRight: 6,
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: 'white',
    backgroundColor: 'rgba(#BFACE0, 0.2)',
  },
  info: {},
}));

export const NavItem = ({
  title,
  href,
  depth,
  children,
  icon: Icon,
  className,
  open: openProp,
  info: Info,
  ...rest
}: navItem): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen: any) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  var array = href.split('/');

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Link href={href}>
        <Box
          className={clsx(
            classes.buttonLeaf,
            `depth-${depth}`,
            router.pathname.includes(array[2]) ? classes.active : null,
          )}
          style={style}
        >
          {Icon && (
            <img
              src={Icon.src}
              height="20px"
              width="20px"
              className={classes.icon}
            />
          )}
          <span className={classes.title}>{title}</span>
          {Info && <Info className={classes.info} />}
        </Box>
      </Link>
    </ListItem>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TopTaps from './TopTaps';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  }
}));

export default function Header() {
  const classes = useStyles();
  const title = "Basa";

  return (
    <div
      className={classes.root}>
      <React.Fragment>
        <nav>
          <Toolbar 
            className={classes.toolbar}>
            <Button 
              size="small">
                Subscribe
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              {title}
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => document.location.href="/signin"}
            >
              Sign in
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => document.location.href="/signup"}
            >
              Sign up
            </Button>
          </Toolbar>
        </nav>
        <aside>
          <Box>
            <TopTaps/>
          </Box>
        </aside>
      </React.Fragment>
    </div>
  );
}
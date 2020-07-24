import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TopTaps from './TopTaps';
import SignIn from '../pages/SignIn';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  dialogActions: {
    justifyContent: "space-between"
  }
}));

export default function Header() {
  const classes = useStyles();
  const title = "Basa";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);

  const _onSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const _onSignInClose = () => {
    setIsSignInOpen(false);
  };

  const _onMoveSignUp = () => {
    document.location.href = "/signup";
  }

  return (
    <React.Fragment>
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
                onClick={_onSignInOpen}
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
      <Dialog
        fullScreen={fullScreen}
        open={isSignInOpen}
        onClose={_onSignInClose}
        aria-labelledby="responsive-dialog-title">
          <DialogTitle 
            id="responsive-dialog-title">
              {"로그인"}
          </DialogTitle>
          <DialogContent>
            {/*
            <DialogContentText>
              Blah Blah ~~~~ 
            </DialogContentText>
            */}
            <SignIn/>
          </DialogContent>
          <DialogActions
            className={classes.dialogActions}>
            <Button 
              autoFocus 
              onClick={_onMoveSignUp} 
              color="primary">
                회원가입
            </Button>
            <Button 
              onClick={_onSignInClose} 
              color="primary" 
              autoFocus>
                닫기
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
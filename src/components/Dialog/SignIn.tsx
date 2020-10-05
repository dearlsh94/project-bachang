import React from 'react';
import {useRecoilState} from 'recoil';
import {SignInState} from 'state/common/SignInState';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getSignInUserId, LogoutUser } from 'utils/UserUtil';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarleft: {
    textAlign: "left",
  },
  toolbarcenter: {
    textAlign: "center"
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarright: {
    textAlign: "right",
  },
  dialogActions: {
    justifyContent: "space-between"
  }
}));

const SignIn = () => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSignInOpen, setIsSignInOpen] = useRecoilState(SignInState);

  const _onMoveToMain = () => {
    document.location.href = "/";
  }

  const _onSignInOpen = () => {
    setIsSignInOpen({
      isOpen: true
    });
  };

  const _onSignInClose = () => {
    setIsSignInOpen({
      isOpen: false
    });
  };

  const _onMoveSignUp = () => {
    document.location.href = "/signup";
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isSignInOpen.isOpen}
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
            tabIndex={-1}
            onClick={_onMoveSignUp} 
            color="primary">
              회원가입
          </Button>
          <Button 
            autoFocus
            tabIndex={-1}
            onClick={_onSignInClose} 
            color="primary">
              닫기
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default SignIn;
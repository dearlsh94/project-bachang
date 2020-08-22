import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { checkGameUser } from 'utils/UserUtil';
import IUserInfo from 'interfaces/User/IUserInfo';

import MyButton from 'elements/Button/MyButton';
import MyAlert from 'elements/Alert/MyAlert';
import MyBackdrop from 'elements/Backdrop/MyBackdrop';

interface IProps {
  userInfo: IUserInfo,
}

const useStyles = makeStyles((theme) => ({
  title: {
    
  },
  form: {
    marginTop: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const duration = 3000;

function AuthUserInfo(props: IProps) {

  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);

  const _onAuthRequest = async () => {
    setIsDisabled(true);

    const res = await checkGameUser(userInfo.server, userInfo.character);
    
    if (res) {
      // Successed Authentication
      setOpenSuccessAlert(true);
      setTimeout(() => setOpenSuccessAlert(false), duration);
      setTimeout(() => document.location.reload(), duration);
    }
    else {
      // Failed Authentication
      setOpenErrorAlert(true);
      setTimeout(()=> {
        setOpenErrorAlert(false);
        setIsDisabled(false);
      }, duration);
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        className={classes.title}>
          회원인증
      </Typography>
      <Grid container spacing={2}
        className={classes.form}>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            서버
          </Grid>
          <Grid item xs={9}>
            {userInfo.server}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            닉네임
          </Grid>
          <Grid item xs={9}>
            {userInfo.character}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            인증정보
          </Grid>
          <Grid item xs={9}>
            {
              userInfo.isAuth 
              ? "인증"
              : "미인증"
            }
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <MyButton
            disabled={isDisabled}
            color="blue"
            text={isDisabled ? "인증 중입니다." : "인증신청"}
            onClick={_onAuthRequest}/>
        </Grid>
      </Grid>
      <MyBackdrop
        isOpen={isDisabled}/>
      {
        openSuccessAlert &&
          <MyAlert
            isOpen={true}
            severity="success"
            duration={duration}
            text="인증 성공! 잠시 후 회원정보로 이동 됩니다." />
      }
      {
        openErrorAlert &&
          <MyAlert
            isOpen={true}
            severity="error"
            duration={duration}
            text="인증 실패!" />
      }
    </Container>
  ); 
}

export default AuthUserInfo;
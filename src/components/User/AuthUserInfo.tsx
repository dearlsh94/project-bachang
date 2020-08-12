import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { checkGameUser } from 'utils/UserUtil';
import IUserInfo from 'interfaces/Common/IUserInfo';

import MyButton from 'elements/MyButton';

interface IProps {
  userInfo: IUserInfo,
}

const useStyles = makeStyles((theme) => ({
  title: {
    
  },
  form: {
    marginTop: 10,
  },
}));

function AuthUserInfo(props: IProps) {

  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const _onAuthRequest = async () => {
    const res = await checkGameUser(userInfo.server, userInfo.character);
    
    if (res) {
      console.log("인증성공");
    }
    else {
      console.log("인증실패");
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
            color="blue"
            text="인증신청"
            onClick={_onAuthRequest}/>
        </Grid>
      </Grid>
    </Container>
  ); 
}

export default AuthUserInfo;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import MyTextField from '../elements/MyTextField';
import MyButton from '../elements/MyButton';


const useStyles = makeStyles((theme) => ({
	title: {
    marginTop: 10,
    textAlign: "center",
    justifyContent: "flex-center",
  },
  backArrow: {
    alignItems: "center",
    justifyContent: "flex-left",
  },
	form: {
		marginTop: 20,
	},
	signup: {
		marginTop: 20,
	}
}));

interface IProps{
}

interface IState{
}

export default function FindId() {
  const classes = useStyles();

  const [isSendAuthMail, setIsSendAuthMail] = React.useState(true);

  const _onSendAuthMail = () => {
    setIsSendAuthMail(true);
  }

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
        <Box>
          {
            isSendAuthMail &&
              <ArrowBackIosIcon/>
          }
          <Typography 
            className={classes.title}
            component="h1" 
            variant="h5">
              아이디 찾기
          </Typography>
        </Box>
				<form
					noValidate 
					className={classes.form}>
            <Grid container spacing={2}>
            {
              isSendAuthMail ?
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="auth"
                    name="auth"
                    label="인증번호"
                    value=""
                    onChange={() => {}}
                  />
                </Grid>
              :
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="mail"
                    name="mail"
                    label="가입메일"
                    autoComplete="mail"
                    value=""
                    onChange={() => {}}
                  />
                </Grid>
            }
            </Grid>
            <Grid 
              container 
              justify="flex-end"
              className={classes.signup}>
                {
                  isSendAuthMail ?
                    <MyButton
                      color="red"
                      text="인증 완료"
                      onClick={() => {
                        alert("인증 완료");
                      }}/>
                  :
                    <MyButton
                      color="blue"
                      text="인증번호 받기"
                      onClick={_onSendAuthMail}/>
                  }
            </Grid>
				</form>
			</Container>
    </React.Fragment>
  );
}
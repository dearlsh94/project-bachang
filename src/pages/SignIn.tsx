import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MyButton from '../elements/MyButton';

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: 0,
	},
	signin: {
		marginTop: 10,
	}
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <React.Fragment>
			<Container 
				component="main" 
				maxWidth="xs">
					<form
						noValidate 
						className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
											variant="outlined"
											required
											fullWidth
											id="id"
											name="id"
											label="User ID"
											autoComplete="id"
											value=""
											onChange={() => {}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										value=""
										onChange={() => {}}
									/>
								</Grid>
								<Grid item xs={12}>
									<Link href="/signin" variant="body2">
										아이디 / 비밀번호 찾기
									</Link>
								</Grid>
							</Grid>
							<Grid 
								container 
								justify="flex-end"
								className={classes.signin}>
									<MyButton
										color="red"
										text="로그인"
										onClick={() => {
											alert("LOGIN");
										}}/>
							</Grid>
					</form>
			</Container>
    </React.Fragment>
  );
}
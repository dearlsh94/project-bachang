import React, {Component} from 'react';

import MyTextField from '../elements/MyTextField';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles: any = {
    heroContent: {

    },
    paper: {
        marginTop: 10
    },
    form: {
        marginTop: 20
    },
    btnSignIn: {
        marginTop: 20
    }
  };

interface IProps{
    classes: any,
}

interface IState{
    id: string,
    password: string,
}

class SignIn extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            id: '',
            password: '',
        }
    }

    // define ref zone start
    refEmail: any = '';
    refPassword: any = '';
    refSignIn: any = '';
    // define ref zone end

    checkValidate = () => {
        if (this.state.id === '') {
            alert("Please Input ID");
            return false;
        }
            
        if (this.state.password === '') {
            alert("Please Input Password");
            return false;
        }

        return true;
    }

    handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            id: e.target.value,
        });
    }

    handleKeyUpEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.refPassword.focus();
        }
    }

    handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleKeyUpPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.refSignIn.focus();
            this.handleSignUp();
        }
    }

    handleSignUp = () => {
        if (!this.checkValidate()) {
            return false;
        }
    }

    

    render() {
        const { classes } = this.props;
        const { id, password } = this.state;

        return(
            <div>
                <div className={classes.heroContent}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <MyTextField
                                    id="id"
                                    name="id"
                                    label="User Id"/>
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
                                    value={password}
                                    onChange={this.handleChangePassword}
                                    onKeyUp={this.handleKeyUpPassword}
                                    inputRef={ref => this.refPassword = ref}
                                />
                                </Grid>
                            </Grid>
                            <Button
                                className={classes.btnSignIn}
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleSignUp}
                                buttonRef={ref => this.refSignIn = ref}
                            >
                                Sign In
                            </Button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SignIn);
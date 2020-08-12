import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { getSignInUserId, getUserInfoById } from 'utils/UserUtil';

import IUserInfo from 'interfaces/Common/IUserInfo';

import MyButton from 'elements/MyButton';
import NoSignInUser from 'components/User/NoSignInUser';
import ViewUserInfo from 'components/User/ViewUserInfo';
import EditUserInfo from 'components/User/EditUserInfo';
import AuthUserInfo from 'components/User/AuthUserInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  leftSection: {
  },
  rightSection: {
    padding: 10,
  },
}));

function MyInfo() {
  const classes = useStyles();

  const userId: string = getSignInUserId();
  const userInfo: IUserInfo = getUserInfoById(userId);

  const [mode, setMode] = React.useState("edit");

  const _onViewUser = () => {
    setMode("view");
  }

  const _onEditUser = () => {
    setMode("edit");
  }

  const _onAuthUser = () => {
    setMode("auth");
  }

  return (
    <React.Fragment>
      {
        userId === "" ?
          <NoSignInUser />
        :
        <Container 
          className={classes.root}
          component="main" 
          maxWidth="md">
            <Grid container>
              <Grid item xs={2} className={classes.leftSection}>
                <MenuList>
                  <MenuItem onClick={_onViewUser}>회원정보</MenuItem>
                  <Divider variant="middle"/>
                  <MenuItem onClick={_onEditUser}>정보수정</MenuItem>
                  <Divider variant="middle"/>
                  <MenuItem onClick={_onAuthUser}>회원인증</MenuItem>
                </MenuList>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={9} className={classes.rightSection}>
                {
                  mode === "view" &&
                    <ViewUserInfo 
                      userInfo={userInfo}/>
                }
                {
                  mode === "edit" &&
                    <EditUserInfo
                      userInfo={userInfo}/>
                }
                {
                  mode === "auth" &&
                    <AuthUserInfo 
                      userInfo={userInfo}/>
                }
              </Grid>
            </Grid>
        </Container>
        
      }
    </React.Fragment>
  )
}

export default MyInfo;


/*
<Container 
  className={classes.root}
  component="main" 
  maxWidth="sm">
    <Link 
      component="button"
      variant="body2" 
      tabIndex={-1}
      onClick={_onChangeEditMode}>
        정보수정
    </Link>
    <form
      noValidate 
      className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
                disabled
                variant="outlined"
                required
                fullWidth
                margin="dense"
                id="id"
                name="id"
                label="User ID"
                autoComplete="id"
                value={userInfo.id}
            />
          </Grid>
        </Grid>
        {
          isEditMode &&
            <Grid container item xs={12}
              justify="flex-end"
              className={classes.edit}>
                <MyButton
                  color="red"
                  text="수정"
                  onClick={_onEdit}/>
            </Grid>
        }
  </form>
</Container>
*/        
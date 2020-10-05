import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { getSignInUserId, getUserInfoById } from 'utils/UserUtil';

import IUserInfo from 'interfaces/User/IUserInfo';

import LeftMenuList from 'components/User/LeftMenuList';

import NoSignInUser from 'components/User/NoSignInUser';
import ViewUserInfo from 'components/User/ViewUserInfo';
import EditUserInfo from 'components/User/EditUserInfo';
import AuthUserInfo from 'components/User/AuthUserInfo';
import AccountInfo from 'components/User/AccountInfo';
import ChagnePassword from 'components/User/ChagnePassword';

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

function MyInfo({match}: any) {
  const classes = useStyles();
  const {tab} = match.params;

  const [mode, setMode] = React.useState(tab);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    id: getSignInUserId(),
    isActive: false,
    createDateString: "",
    editDateString: ""
  });

  // Init User Information
  useEffect(() => {
    if (userInfo.id) getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const info = await getUserInfoById(userInfo.id);

    if (info !== null) setUserInfo(info);
  };

  return (
    <React.Fragment>
      {
        !userInfo.id ?
          <NoSignInUser />
        :
        <Container 
          className={classes.root}
          component="main" 
          maxWidth="md">
            <Grid container>
              <Grid item xs={2} className={classes.leftSection}>
                <LeftMenuList />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={9} className={classes.rightSection}>
                {
                  (mode === "view") &&
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
                {
                  mode === "char" &&
                    <AccountInfo 
                      userInfo={userInfo}/>
                }
                {
                  mode === "chgPwd" &&
                    <ChagnePassword
                      id={userInfo.id} />
                }
              </Grid>
            </Grid>
        </Container>
        
      }
    </React.Fragment>
  )
}

export default MyInfo;
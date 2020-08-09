import React from 'react';

import { getSignInUserInfo } from 'utils/UserUtil';
import { Typography } from '@material-ui/core';

const MyInfo = () => {

  const userInfo = getSignInUserInfo();

  return (
    <React.Fragment>
      {
        userInfo.length < 0 ?
          <Typography>
            로그인 된 정보가 없습니다. 로그인 해주세요.
            로그인하기
          </Typography>
        :
          <Typography>
            LOGIN USER ID - {userInfo.id}
          </Typography>
      }
    </React.Fragment>
  )
}

export default MyInfo;
import React from 'react';
import Button from '@material-ui/core/Button';

import { SignUpUser } from 'utils/UserUtil';

export default function Test() {

  const _onTest = () => {
    SignUpUser({
      id: "whitow",
      password: "admin",
      mail: "whitow@test.com"
    });
  }

  return (
    <React.Fragment>
      <Button 
        autoFocus
        tabIndex={-1}
        onClick={_onTest} 
        color="primary">
          유저생성
      </Button>
    </React.Fragment>
  );
}
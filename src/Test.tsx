import React from 'react';
import Button from '@material-ui/core/Button';

import { checkGameUser } from 'utils/UserUtil';

export default function Test() {

  const _onTest = () => {
    checkGameUser("하자", "협가검");
  }

  return (
    <React.Fragment>
      <Button 
        autoFocus
        tabIndex={-1}
        onClick={_onTest} 
        color="primary">
          유저조회
      </Button>
    </React.Fragment>
  );
}
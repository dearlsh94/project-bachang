import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { checkGameUser } from 'utils/UserUtil';

const useStyles = makeStyles((theme) => ({
  
}));

export default function Test() {
  const classes = useStyles();

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
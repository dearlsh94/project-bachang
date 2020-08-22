import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps{
  isOpen: boolean
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyBackdrop = (props: IProps) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default MyBackdrop;
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

/* example
...
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
-- Close after 4'sec --
  setOpenSuccessAlert(true);
  setTimeout(() => setOpenSuccessAlert(false), 4000);
-- Component --
  {
    openSuccessAlert &&
      <MyAlert
        isOpen={true}
        severity="success"
        duration={4000}
        text="성공 메세지" />
  }
*/

interface IProps {
  isOpen: boolean,
  severity: "success" | "error" | "info" | "warning",
  message: string,
  duration: number
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MyAlert(props: IProps) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        anchorOrigin={{ vertical: "top", horizontal: "right"}}
        open={isOpen} 
        autoHideDuration={props.duration} 
        onClose={handleClose}>
          <Alert onClose={handleClose} severity={props.severity}>
            {props.message}
          </Alert>
      </Snackbar>
    </div>
  );
}

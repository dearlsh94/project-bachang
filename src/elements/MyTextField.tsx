import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props {
  id: string,
  name: string,
  label: string,
}

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
  },
});

export default function AdaptingHook(props: Props) {
  const { label, id, name, ...other } = props;
  const classes = useStyles(props);
  return (
    <React.Fragment>
       <TextField 
          className={classes.root} {...other}
          variant="outlined"
          required
          fullWidth
          label={props.label}
          id={props.id}
          name={props.name} />
    </React.Fragment>
  );
}

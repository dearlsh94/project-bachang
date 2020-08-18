import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import MyButton from 'elements/Button/MyButton';
import MyTextEditor from 'elements/TextEditor/MyTextEditor';
import MyAlert from 'elements/Alert/MyAlert';

import IPost from 'interfaces/Common/IPost';

import { CreatePost } from 'utils/PostUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
  selector: {
    minWidth: "180px",
    textAlign: "center"
  },
  buttonZone: {
    marginTop: "10px"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const duration = 3000;

function PostWrite() {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
  const [openConfirmCancle, setOpenConfirmCancle] = React.useState(false);
  const [category, setCategory] = React.useState(10);
  const [title, setTitle] = React.useState("");

  const refTitle = React.useRef<any>();

  const _onChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as number);
    refTitle.current.focus();
  }

  const _onCancle = () => {
    setOpenConfirmCancle(true);
  }

  const _onWrite = () => {
    setIsDisabled(true);

    // Processing...
    const post: IPost = {
      key: "9999",
      section: "free",
      title: "title",
      content: "content",
      viewCount: 0,
      writer: {
        creater: "sys",
        createDate: new Date(),
        editer: "sys",
        lastEditDate: new Date(),
      }
    }

    const res = CreatePost(post);

    if (res) {
      // Successed Authentication
      setOpenSuccessAlert(true);
      setTimeout(() => setOpenSuccessAlert(false), duration);
      setTimeout(() => document.location.reload(), duration);
    }
    else {
      // Failed Authentication
      setOpenErrorAlert(true);
      setTimeout(()=> {
        setOpenErrorAlert(false);
        setIsDisabled(false);
      }, duration);
    }
  }

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        className={classes.root}>
        <Grid 
          container
          spacing={1}
          direction="column"
          justify="flex-start">
          <Grid item xs={3}>
            <Select
              labelId="post-category"
              id="category"
              value={category}
              onChange={_onChangeCategory}
              displayEmpty
              className={classes.selector}>
                <MenuItem value={10}>자유게시판</MenuItem>
                <MenuItem value={20}>서버게시판</MenuItem>
                <MenuItem value={30}>게시판1</MenuItem>
                <MenuItem value={40}>게시판2</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              id="title"
              name="title"
              label="Title"
              value={title}
              inputRef={refTitle}
              onChange={(e) => { setTitle(e.target.value); }}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextEditor/>
          </Grid>
          <Grid container item xs={12}
            justify="space-between"
            className={classes.buttonZone}>
              <Grid item xs={3}>
                <MyButton
                  color="red"
                  text="취소"
                  onClick={_onCancle}/>
              </Grid>
              <Grid item xs={3}>
                <MyButton
                  color="blue"
                  text="저장"
                  onClick={_onWrite}/>
              </Grid>
          </Grid>
        </Grid>
      </Container>
      <Backdrop className={classes.backdrop} open={isDisabled}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {
        openSuccessAlert &&
          <MyAlert
            isOpen={true}
            severity="success"
            duration={duration}
            text="작성되었습니다. 잠시 후 게시판으로 이동합니다." />
      }
      {
        openErrorAlert &&
          <MyAlert
            isOpen={true}
            severity="error"
            duration={duration}
            text="작성에 실패하였습니다." />
      }
      <Dialog
        open={openConfirmCancle}>
          <DialogContent>
            작업한 내용이 사라집니다. 
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {setOpenConfirmCancle(false)}} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {setOpenConfirmCancle(false)}} color="primary">
              Ok
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PostWrite;
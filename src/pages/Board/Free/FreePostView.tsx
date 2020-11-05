import React, { useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PostTitle from 'components/Board/PostTitle';
import PostContent from 'components/Board/PostContent';
import PostComment from 'components/Board/PostComment';

import IPost from 'interfaces/Board/IPost';
import { getPost, DeletePost } from 'utils/PostUtil';

import * as CommonUtil from 'utils/ComoonUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    width: "100%"
  },
  editBox: {
    marginTop: "10px",
    marginRight: "30px",
    textAlign: 'right'
  }
}));

const duration = 2000;

function FreeBoard({match}: any) {
  const classes = useStyles();
  const { category, seq } = match.params;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [post, setPost] = React.useState<IPost>();

  useEffect(() => {
    _onLoad();
  }, []);

  const _onLoad = async () => {
    const res = await getPost(category, seq);
    if (res) setPost(res);
  }

  const _onEdit = () => {
    if (isCheckAuth()) {
      document.location.href = `/board/write/${category}/${seq}`
    }
  }

  const delPost = async () => {
    if (isCheckAuth()) {
      setMyBackdrop(true);
      
      const res = await DeletePost(category, seq);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
  
        setTimeout(() => document.location.href = `/board/${category}`, duration);
      }
      else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message
        });
        
        setTimeout(()=> { setMyBackdrop(false); }, duration);
      }
    }
  }

  const isCheckAuth = () => {
    if (!post) {
      alert("게시글 정보가 없습니다.");
      window.location.href = `/board/${category}`
    }
    else {
      if (post.writer.key !== CommonUtil.getNowKey()) {
        alert("권한이 없습니다.");
        window.location.href = `/board/${category}/${seq}`
  
        return false;
      }
      
      return true;
    }
  }

  const _onOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const _onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const _onAgreeConfirm = () => {
    setOpenConfirm(false);
    delPost();
  };

  return (
    <Container
      className={classes.root}>
        {
          post ?
            <Container>
              <PostTitle
                post={post}/>
              <Box
                className={classes.editBox}>
                  <Button
                    onClick={_onEdit}>
                      수정
                  </Button>
                  <Button
                    onClick={_onOpenConfirm}>
                      삭제
                  </Button>
              </Box>
              <PostContent
                post={post}/>
              <PostComment
                post={post}/>
              <Dialog
                open={openConfirm}
                onClose={_onCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"정말 삭제하시겠습니까?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    삭제한 게시글은 되돌릴 수 없습니다.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={_onCloseConfirm} color="primary">
                    취소
                  </Button>
                  <Button onClick={_onAgreeConfirm} color="primary">
                    확인
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
          :
            <Container>
              정보가 없습니다.
            </Container>
        }
    </Container>
  );
}

export default FreeBoard;
import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import IPost from 'interfaces/Board/IPost';

interface IProps {
  post: IPost
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px"
  },
  input: {
    border: "2px"
  },
  inputButton: {
    height: "100%"
  },
  footer: {
    marginTop: '50px',
    textAlign: 'center'
  },
}));

function PostComment(props: IProps) {

  const classes = useStyles();
  const post: IPost = props.post;

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (post.commentList) {
      setCount(post.commentList.length);
    }
  }, []);

  return (
    <Container
      className={classes.root}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2">
              {count} 개의 댓글이 있습니다.
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={10}>
              <Input
                id="input-comment"
                className={classes.input}
                multiline
                fullWidth
                rows={4}
                placeholder="댓글을 입력하세요. 올바른 언어 사용 문화를 지지합니다."
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                className={classes.inputButton}
                fullWidth
                variant="outlined"
                color="primary">
                  등록
              </Button>
            </Grid>
          </Grid>
        </Grid>
    </Container>
  ); 
}

export default PostComment;
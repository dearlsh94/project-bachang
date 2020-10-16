import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PostTitle from 'components/Board/PostTitle';
import PostContent from 'components/Board/PostContent';
import PostComment from 'components/Board/PostComment';

import IPost from 'interfaces/Board/IPost';
import { getPost } from 'utils/PostUtil';

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

function FreeBoard({match}: any) {
  const classes = useStyles();
  const { category, seq } = match.params;

  const [post, setPost] = React.useState<IPost>();

  useEffect(() => {
    _onLoad();
  }, []);

  const _onLoad = async () => {
    const res = await getPost(category, seq);
    if (res) setPost(res);
  }

  const _onEdit = () => {

  }

  const _onDelete = () => {
    
  }

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
                  <Button>
                    수정
                  </Button>
                  <Button>
                    삭제
                  </Button>
              </Box>
              <PostContent
                post={post}/>
              <PostComment
                post={post}/>
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
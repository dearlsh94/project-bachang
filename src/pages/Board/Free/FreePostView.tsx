import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import PostTitle from 'components/Board/PostTitle';
import PostContent from 'components/Board/PostContent';
import PostComment from 'components/Board/PostComment';

import IPost, { CategoryType } from 'interfaces/Board/IPost';
import { getPost } from 'utils/PostUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    width: "100%"
  },
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

  return (
    <Container
      className={classes.root}>
        {
          post ?
            <Container>
              <PostTitle
                post={post}/>
                수정 삭제
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
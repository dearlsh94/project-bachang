import axios from 'axios';

import IPost from 'interfaces/Board/IPost';
import { getSignInUserKey, getSignInUserId } from 'utils/UserUtil';
import * as CommonUtil from 'utils/ComoonUtil';

import { CategoryType } from 'interfaces/Board/IPost';
import IComment from 'interfaces/Board/IComment';

// 게시글 생성
export const CreatePost = async (_category: CategoryType, _title: string, _content: string) => {
  const post: IPost = {
    category: _category,
    title: _title,
    content: _content,
    writer: getWriter()
  }

  const res = await axios.post(`/api/board/${post.category}/create`, post, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    CommonUtil.checkServerError(res.data);

    return res.data;
  })
  .catch((e) => {
    console.log(`CREATE POST ERROR > ${e}`);

    return false;
  });

  return res;
}

// 댓글 생성
export const CreateComment = async (_category: CategoryType, _seq: number, _comment: string) => {
  const comment: IComment = {
    message: _comment,
    writer: getWriter()
  }
  
  const res = await axios.post(`/api/board/${_category}/comment/create`, {
      seq: _seq,
      comment: comment
    }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    CommonUtil.checkServerError(res.data);

    return res.data;
  })
  .catch((e) => {
    console.log(`CREATE COMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// 댓글 답글 생성
export const CreateRecomment = async (_category: CategoryType, _seq: number, _commentIdx: number, _recomment: string) => {
  const recomment: IComment = {
    message: _recomment,
    writer: getWriter()
  }
  
  const res = await axios.post(`/api/board/${_category}/recomment/create`, {
      seq: _seq,
      commentIdx: _commentIdx,
      recomment: recomment
    }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    CommonUtil.checkServerError(res.data);
    
    return res.data;
  })
  .catch((e) => {
    console.log(`CREATE COMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}


// 게시글 리스트 조회
export const getPosts = async (_category: CategoryType, _title?: string, 
        _content?: string, _writer?: string, _createDateString?: string) => {

  let posts: Array<IPost> = [];

  let filter = "";
  if ( _category ) filter += `category=${_category}&`;
  if ( _title ) filter += `title=${_title}&`;
  if ( _content ) filter += `content=${_content}&`;
  if ( _writer ) filter += `writer=${_writer}&`;
  if ( _createDateString ) filter += `createDateString=${_createDateString}&`;

  await axios.get(`/api/board/free/find?${filter}`)
  .then((res) => {
    if (res.data.code === 200) {
      posts = Object.setPrototypeOf(res.data.posts, posts);
    }
    return true;
  })
  .catch((e) => {
    console.log(`FIND POSTS ERROR > ${e}`);

    return false;
  });

  return posts;
}

// 게시글 조회
export const getPost = async (_category: CategoryType, _seq: number) => {

  const getUri = `/api/board/${_category}/find/${_seq}`;
  const res = await axios.get(getUri)
  .then((res) => {
    if (res.data.code === 200) {
      return res.data.post as IPost;
    }

    return null;
  })
  .catch((e) => {
    console.log(`FIND POST ERROR > ${e}`);

    return null;
  });

  return res;
}



// 게시판 목록 이름 조회
export const getCategoryName = (_category: CategoryType) => {
  switch (_category) {
    case "tip":
      return "팁게시판";
    case "free":
      return "자유게시판";
    case "screenshot":
      return "스크린샷게시판";
    case "server":
      return "서버게시판";
    case "offer":
      return "구인구직게시판";
    case "job":
      return "직업게시판";
    default:
      break;
  }
}

// 작성자 객체 생성
const getWriter = () => {
  return {
    key: getSignInUserKey(),
    id: getSignInUserId(),
    createDateString: CommonUtil.getNowDateString(),
    lastEditDateString: CommonUtil.getNowDateString()
  }
}
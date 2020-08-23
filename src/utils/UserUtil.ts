import axios from 'axios';
import cheerio from 'cheerio';
import crypto from 'crypto';

import IUserInfo from 'interfaces/User/IUserInfo';
import ISignUpUser from 'interfaces/User/ISignUpUser';
import ISignInUser from 'interfaces/User/ISignInUser';

import * as CommonUtil from 'utils/ComoonUtil';

import { getToken, setToken, delToken } from 'utils/ComoonUtil';

export const CheckExistUser = async (id: string) => {
  
}

export const SignUpUser = (user: ISignUpUser) => {

  // Create Encrypt salt
  let mySalt = Math.round((new Date().valueOf() * Math.random())) + "";

  const newUser: ISignUpUser = {
    id: user.id,
    mail: user.mail,
    password: crypto.createHash("sha512").update(user.password + mySalt).digest("hex"),
    salt: mySalt
  }

  //DB Process for Create User
  const res = axios.post('api/user/signup', newUser)
    .then((res) => {
      console.log("SIGN UP RES > ", res);

      if (res.data.code === 1) {
        return true;
      }
      else {
        alert(res.data.message);

        return false;
      }
    })
    .catch((e) => {
      console.log("SIGN UP ERROR > ", e);

      return false;
    });

  return res;
}

export const SignInUser = (_id: string, _password: string) => {
  // TODO - DB Process for Check Sign Up User
  const res = axios.post('api/user/signin', {id: _id, password: _password})
    .then((res) => {
      console.log("SIGN IN RES > ", res);

      if (res.data.code === 1) {
        // Create JWT
        const token = res.data.token;

        // Create SignIn User Info
        const signInUser: ISignInUser = {
          token: token,
        }

        // Session Store
        setToken(signInUser);

        return true;
      }
      else {
        alert(res.data.message);

        return false;
      }
    });

  return res;
}

export const getSignInUserId = () => { 

  const userId = getIdFromJWT(getToken());

  return userId;
}

export const getUserInfoById = (_id: string) => {
  // TODO - DB Process Get UserInfo By Id

  const userInfo: IUserInfo = {
    id: _id,
    mail: "mail@mail.net",
    server: "하자",
    character: "협가검",
    isAuth: true,
    point: 0,
    grade: "초보자",
    createDateString: CommonUtil.getNowDateString(),
    authDateString: CommonUtil.getNowDateString(),
    isActive: true
  }

  return userInfo;
}

export const LogoutUser = () => {
  delToken();
}


/*
* 바람의 나라 공식 사이트 한줄인사말 데이터 크롤링하여, 사용자 인증 처리
*/
export const checkGameUser = async (server: string, character: string) => {
  const r = await axios.post('/api/user/check', {
      token: getToken(),
      character: character,
      server: server
    })
    .then((res) => {
      console.log(res.data);
      
      return res.data;
    })
    .catch((e) => {
      console.log("CHECK GAME USER ERROR > ", e);
      
      return false;
    });

  return r;
}

/*
* JWT 구조
* [HEADER].[PAYLOAD].[VERIFY SIGNATURE]
*/
const getIdFromJWT = (token: string) => {
  if (token !== "") {
    // Get Token
    const splitToken = token.split(".");
  
    // Get Payload Token
    const payloadToken = splitToken[1];
  
    // Decode Base64 and Transfer to JSON
    const payload = JSON.parse(atob(payloadToken));
  
    return payload.id;
  }
  else {
    return "";
  }
}
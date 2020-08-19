import axios from 'axios';
import cheerio from 'cheerio';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

import jwtObject from 'conf/jwt';

import IUserInfo from 'interfaces/User/IUserInfo';
import ISignUpUser from 'interfaces/User/ISignUpUser';
import ISignInUser from 'interfaces/User/ISignInUser';
import { getSessionNameUserToken } from 'utils/ConfigUtil';

import * as CommonUtil from 'utils/ComoonUtil';

export const SignUpUser = (user: ISignUpUser) => {

  // Create Encrypt salt
  let mySalt = Math.round((new Date().valueOf() * Math.random())) + "";

  const newUser: ISignUpUser = {
    id: user.id,
    mail: user.mail,
    password: crypto.createHash("sha512").update(user.password + mySalt).digest("hex"),
    salt: mySalt
  }

  //TODO - DB Process for Create User

  console.log("NEW USER > ", newUser);

  return true;
}

export const SignInUser = (_id: string, _password: string) => {
  // TODO - DB Process for Check Sign Up User

  // Create JWT
  const token = jsonwebtoken.sign(
    {
      id: _id,
    },
    jwtObject.secret,
    {
      expiresIn: '5m'
    }
  );

  // Create SignIn User Info
  const signInUser: ISignInUser = {
    token: token,
  }

  // Session Store
  setSessionUserToken(signInUser);
}

export const getSignInUserId = () => { 
  const userToken = getSessionUserToken();
  if ( userToken === null ) {
    return "";
  }

  const userId = getIdFromJWT(JSON.parse(userToken).token);

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
  delSessionUserToken();
}


/*
* 바람의 나라 공식 사이트 한줄인사말 데이터 크롤링하여, 사용자 인증 처리
*/
export const checkGameUser = (server: string, character: string) => {

  const userId = encodeURI(character);
  const userServer = encodeURI(server);
  
  return new Promise((resolve, reject) => {
    axios.get(`/Profile/Info?character=${userId}%40${userServer}`)
      .then((html) => {
        if (html === undefined)
            throw new Error("NO HTML");
          
          const $ = cheerio.load(html.data);
          const $txtMessage = $("textarea").text();

          const regContainCharacter = new RegExp(character, "g");

          const regRes = regContainCharacter.test($txtMessage);
          console.log("REG RESPONSE > ", regRes);

          return regRes;
      })
      .then((regRes) => {
        console.log("[TODO] RUN DB PROCESS");

        resolve(regRes);
      })
      .catch((e) => {
        console.log("CHECK GAME USER ERROR > ", e);

        resolve(false);
      })
  });
}



const setSessionUserToken = (signInUser: ISignInUser) => {
  localStorage.setItem(
    getSessionNameUserToken(),
    JSON.stringify(signInUser)
  );
}

const getSessionUserToken = () => {
  return localStorage.getItem(getSessionNameUserToken());
}

const delSessionUserToken = () => {
  localStorage.removeItem(getSessionNameUserToken());
}



/*
* JWT 구조
* [HEADER].[PAYLOAD].[VERIFY SIGNATURE]
*/
const getIdFromJWT = (token: string) => {
  // Get Token
  const splitToken = token.split(".");

  // Get Payload Token
  const payloadToken = splitToken[1];

  // Decode Base64 and Transfer to JSON
  const payload = JSON.parse(atob(payloadToken));

  return payload.id;
}

import axios from 'axios';
import cheerio from 'cheerio';

import IUserInfo from 'interfaces/Common/IUserInfo';
import ISignInUser from 'interfaces/Common/ISignInUser';
import { getSessionUserInfo } from './ConfigUtil';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

export const SignInUser = (_id: string, _password: string) => {
  // Check DB

  // Create SignIn User Info
  const signInUser: ISignInUser = {
    id: _id,
  }

  // Session Store
  localStorage.setItem(
    getSessionUserInfo(),
    JSON.stringify(signInUser)
  );
}

export const LogoutUser = () => {
  localStorage.removeItem(getSessionUserInfo());
}

export const getSignInUser = () => {
  const userInfo = localStorage.getItem(getSessionUserInfo());

  if ( userInfo === null ) {
    return "";
  }

  const jsonUserInfo = JSON.parse(userInfo);

  const signInUser: ISignInUser = {
    id: jsonUserInfo.id,
  }
  
  return signInUser;
}

export const getSignInUserId = () => {
  const userInfo = localStorage.getItem(getSessionUserInfo());
  if ( userInfo === null ) {
    return "";
  }

  return JSON.parse(userInfo).id;
}

export const getUserInfoById = (_id: string) => {
  const userInfo: IUserInfo = {
    id: _id,
    mail: "mail@mail.net",
    server: "하자",
    character: "협가검",
    isAuth: true
  }

  return userInfo;
}

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
import axios from 'axios';
import cheerio from 'cheerio';

import ISginInUser from 'interfaces/Common/ISginInUser';
import { sessionUserInfo } from './ConfigUtil';

export const SignInUser = (_id: string, _password: string) => {
  // Check DB

  // Create SignOn User Info
  const signInUser: ISginInUser = {
    id: _id,
  }

  // Session Store
  localStorage.setItem(
    sessionUserInfo,
    JSON.stringify(signInUser)
  );
}

export const LogoutUser = () => {
  localStorage.removeItem(sessionUserInfo);
}

export const getSignInUserInfo = () => {
  const userInfo = localStorage.getItem(sessionUserInfo);

  if ( userInfo === null ) {
    return "";
  }
  
  return JSON.parse(userInfo);
}

export const checkGameUser = () => {

  const getHtml = async () => {
    try {
      const userId = encodeURI("협가검");
      const userServer = encodeURI("하자");

      return await axios.get(`/Profile/Info?character=${userId}%40${userServer}`);
    }
    catch (e) {
      console.log(e);
    }
  }

  getHtml()
    .then((html) => {

      if (html === undefined)
        throw new Error("no html");

      const $ = cheerio.load(html.data);
      const $txtMessage = $("textarea").text();

      console.log("TEXTMESSAGE : ", $txtMessage);

      return 
    })

}
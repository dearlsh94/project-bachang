/* when import
* import * as CommonUtil from 'utils/ComoonUtil';
*/
import ISignInUser from 'interfaces/User/ISignInUser';
import { getSessionNameUserToken } from 'utils/ConfigUtil';

export const getNowDateString = () => {
  return new Date().toLocaleString();
}

export const setToken = (signInUser: ISignInUser) => {
  localStorage.setItem(
    getSessionNameUserToken(),
    JSON.stringify(signInUser)
  );
}
export const getToken = () => {
  const cookie = localStorage.getItem(getSessionNameUserToken());

  if (cookie) {
    return JSON.parse(cookie).token;
  }
  else {
    return "";
  }
}
export const delToken = () => {
  localStorage.removeItem(getSessionNameUserToken());
}

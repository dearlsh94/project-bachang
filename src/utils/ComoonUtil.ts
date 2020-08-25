/* when import
* import * as CommonUtil from 'utils/ComoonUtil';
*/
import { getSessionNameUserToken } from 'utils/ConfigUtil';

export const getNowDateString = () => {
  return new Date().toLocaleString();
}

export const setToken = (token: string) => {
  localStorage.setItem(
    getSessionNameUserToken(),
    token
  );
}
export const getToken = () => {
  return localStorage.getItem(getSessionNameUserToken());
}
export const delToken = () => {
  localStorage.removeItem(getSessionNameUserToken());
}

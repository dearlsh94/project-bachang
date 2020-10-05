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
  const token = localStorage.getItem(getSessionNameUserToken());
  return token ? token : "";
}

export const delToken = () => {
  localStorage.removeItem(getSessionNameUserToken());
}

export const refreshToken = () => {

}

export const checkServerError = (res: any) => {
  
  if (res.code === 401) {
    alert(res.message);
    delToken();
    document.location.href = res.redirectUri;
  }

  return true;
}
const APP_USER_STORAGE = 'HOTEL-USER-STORAGE';
const APP_ACCESS_TOKEN = 'HOTEL-ACCESS-TOKEN';

export const getSessionUser = () => {
    const userStr = localStorage.getItem(APP_USER_STORAGE);
  
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };

  export const getSessionToken = () => {
    const tokenStr = localStorage.getItem(APP_ACCESS_TOKEN);
  
    if (tokenStr) {
      return tokenStr;
    }
    return null;
  };
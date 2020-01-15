import { baseURI } from './config';

export const getUserAddresses = (successCallBack, failureCallBack, userId, token) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
        successCallBack(xhr.response);
      } else {
        failureCallBack(xhr.response.error_message);
      }
    })
    xhr.open('GET', `${baseURI}/users/${userId}/addresses`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
}

export default getUserAddresses;
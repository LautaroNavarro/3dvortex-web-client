import { baseURI } from './config';

export const createUserAddress = (successCallBack, failureCallBack, userId, name, latitude, longitude, token) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
        successCallBack(xhr.response);
      } else {
        failureCallBack(xhr.response.error_message);
      }
    })
    xhr.open('POST', `${baseURI}/users/${userId}/addresses`);
    let body = {
      'name': String(name),
      'latitude': String(latitude),
      'longitude': String(longitude),
    }
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}

export default createUserAddress;
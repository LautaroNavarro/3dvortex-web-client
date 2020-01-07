import { baseURI } from './config';

let getBase64EmailAndPassword = (email, password) => {
  return `${btoa(email)}:${btoa(password)}`;
}

let logIn = (email, password, successCallBack, failureCallBack) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200){
          successCallBack(xhr.response.token);
        } else {
          failureCallBack(xhr.response.error_message);
        }
      })
      xhr.open('POST', `${baseURI}/users/authenticate/`);
      xhr.setRequestHeader('Authorization', `basic ${getBase64EmailAndPassword(email, password)}`);
      xhr.send();
}

export default logIn;

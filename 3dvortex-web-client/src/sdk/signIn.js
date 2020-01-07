import { baseURI } from './config';

let signIn = (email, password, name, lastname, successCallBack, failureCallBack) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200){
          successCallBack(xhr.response.token);
        } else {
          failureCallBack(xhr.response.error_message);
        }
      })
      xhr.open('POST', `${baseURI}/users/`);
      let body = {
        email,
        password,
        name,
        lastname,
      }
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(body));
}

export default signIn;

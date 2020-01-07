import { baseURI } from './config';

export const listCategories = (successCallBack, failureCallBack) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
        successCallBack(xhr.response);
      } else {
        failureCallBack(xhr.response.error_message);
      }
    })
    xhr.open('GET', `${baseURI}/categories/`);
    xhr.send();
}

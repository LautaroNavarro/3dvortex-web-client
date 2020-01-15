import { baseURI } from './config';
import api from './utils';

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


export const listCategoriesFetch = (sucess, failure) => {
    api('categories/', {
        method: 'GET',
    })
    .then((data) => {
        sucess(data);
    })
    .catch((code, error) => {
        failure(error);
    });
}

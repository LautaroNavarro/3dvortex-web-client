import { baseURI } from './config';

export const NEWESTS_FILTER = 'newests';
export const MOST_PRINTED_FILTER = 'most_printed';

export const getModelById = (successCallBack, failureCallBack, modelId, token) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
        successCallBack(xhr.response);
      } else {
        failureCallBack(xhr.response.error_message);
      }
    })
    xhr.open('GET', `${baseURI}/models/${modelId}`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
}

export default getModelById;
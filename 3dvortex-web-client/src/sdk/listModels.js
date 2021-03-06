import { baseURI } from './config';

export const NEWESTS_FILTER = 'newests';
export const MOST_PRINTED_FILTER = 'most_printed';

export const NAME_FILTER = 'name';

export const listModels = (sucess, failure, filters=[], token=null) => {

    let url = `${baseURI}/models/`;

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (filters.length != 0) {
      url = url + `?${filters.join('&')}`;
    }

    fetch(url, options).then(
        (resp) => {
            if (resp.status === 200){
                resp.json().then((resp) => {sucess(resp);})
            } else {
                resp.json().then(
                    (resp) => {
                        failure(resp.error_message);
                    }
                )
            }
        }
    )
}

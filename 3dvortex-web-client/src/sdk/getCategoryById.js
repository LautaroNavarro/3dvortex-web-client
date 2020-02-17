import { baseURI } from './config';

export const getCategoryById = (sucess, failure, categoryId, token) => {

    let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

    fetch(`${baseURI}/categories/${categoryId}`, options).then(
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

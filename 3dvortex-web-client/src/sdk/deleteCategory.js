import { baseURI } from './config';

export const deleteCategory = (sucess, failure, categoryId, token) => {

    let options = {
        method: 'DELETE',
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

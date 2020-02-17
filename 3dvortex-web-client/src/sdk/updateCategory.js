import { baseURI } from './config';

export const updateCategory = (sucess, failure, categoryId, name, father_category_id, token) => {

    let body = {}

    if (name) {
        body.name = String(name)
    }
    if (father_category_id && father_category_id != 0) {
        body.father_category_id = parseInt(father_category_id)
    }
    if (father_category_id == 0) {
        body.father_category_id = null;
    }

    let options = {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    fetch(
        `${baseURI}/categories/${categoryId}`,
        options
    ).then(
        (resp) => {
            if (resp.status === 200){
                resp.json().then((resp) => {sucess(resp);})
            } else {
                resp.json().then((resp) => {failure(resp.error_message);})
            }
        }
    )

}

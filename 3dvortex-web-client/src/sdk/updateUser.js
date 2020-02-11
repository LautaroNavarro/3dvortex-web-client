import { baseURI } from './config';

export const updateUser = (sucess, failure, userId, name, lastname, email, token) => {

    let body = {}

    if (name) {
        body.name = String(name)
    }
    if (lastname) {
        body.lastname = String(lastname)
    }
    if (email) {
        body.email = String(email)
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
        `${baseURI}/users/${userId}`,
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

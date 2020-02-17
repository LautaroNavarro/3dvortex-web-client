import { baseURI } from './config';

export const listUserOrders = (sucess, failure, user_id, token) => {

    let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

    fetch(`${baseURI}/users/${user_id}/orders`, options).then(
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
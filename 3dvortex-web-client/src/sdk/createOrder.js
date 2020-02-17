import { baseURI } from './config';

export const createOrder = (sucess, failure, model, scale, material, address, token) => {

    let body = {
        model: parseInt(model),
        scale: String(scale),
        material: parseInt(material),
        address: parseInt(address),
    }

    let options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    fetch(
        `${baseURI}/orders/`,
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

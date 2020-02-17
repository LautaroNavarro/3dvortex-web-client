import { baseURI } from './config';

export const createMaterial = (sucess, failure, name, description, pricePerKilogram, token) => {

    let body = {
        name: String(name),
        description: String(description),
        price_per_kilogram: String(pricePerKilogram)
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
        `${baseURI}/materials/`,
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

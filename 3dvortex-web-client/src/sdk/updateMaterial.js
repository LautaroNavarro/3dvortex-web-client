import { baseURI } from './config';

export const updateMaterial = (sucess, failure, materialId, name, description, pricePerKilogram, token) => {

    let body = {}

    if (name) {
        body.name = String(name)
    }

    if (description) {
        body.description = description;
    }

    if (pricePerKilogram) {
        body.price_per_kilogram = pricePerKilogram;
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
        `${baseURI}/materials/${materialId}`,
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

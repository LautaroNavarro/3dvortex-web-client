import { baseURI } from './config';

export const createPrinter = (sucess, failure, name, addressId, status, model, materialId, maxX, maxY, maxZ, token) => {

    let body = {
        name: String(name),
        address: parseInt(addressId),
        status: parseInt(status),
        model: String(model),
        material: parseInt(materialId),
        max_x: String(maxX),
        max_y: String(maxY),
        max_z: String(maxZ),
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
        `${baseURI}/printers/`,
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

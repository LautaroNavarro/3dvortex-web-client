import { baseURI } from './config';

export const updatePrinter = (sucess, failure, printerId, name,addressId, status, model, materialId, maxX, maxY, maxZ, token) => {

    let body = {}

    if (name) {
        body.name = String(name)
    }
    if (addressId) {
        body.address = parseInt(addressId)
    }
    if (status) {
        body.status = parseInt(status)
    }
    if (model) {
        body.model = String(model)
    }
    if (materialId) {
        body.material = parseInt(materialId)
    }
    if (maxX) {
        body.max_x = String(maxX)
    }
    if (maxY) {
        body.max_y = String(maxY)
    }
    if (maxZ) {
        body.max_z = String(maxZ)
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
        `${baseURI}/printers/${printerId}`,
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

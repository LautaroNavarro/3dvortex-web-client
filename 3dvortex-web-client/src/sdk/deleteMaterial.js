import { baseURI } from './config';

export const deleteMaterial = (sucess, failure, materialId, token) => {

    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

    fetch(`${baseURI}/materials/${materialId}`, options).then(
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

import { baseURI } from './config';

export const createImageMediaFromUrl = (sucess, failure, url, token) => {

    let options = {
        method: 'POST',
        body: JSON.stringify({'url': String(url)}),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    fetch(`${baseURI}/model_medias/from-url`, options
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

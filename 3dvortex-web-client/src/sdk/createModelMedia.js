import { baseURI } from './config';


export const createModelMedia = (sucess, failure, data, token) => {

    let formData = new FormData();
    formData.append("content", data);
    let options = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    delete options.headers['Content-Type'];
    fetch(
        `${baseURI}/model_medias/`,
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

import { baseURI } from './config';

function base64ToBlob(base64)
{
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: 'image/png'});
}


export const createImageMedia = (sucess, failure, data, token) => {

    let formData = new FormData();
    formData.append("content", base64ToBlob(data));
    let options = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    delete options.headers['Content-Type'];
    fetch(
        `${baseURI}/image_medias/`,
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
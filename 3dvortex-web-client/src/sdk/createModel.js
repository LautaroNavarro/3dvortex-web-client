import { baseURI } from './config';

export const createModel = (sucess, failure, user_id, name, description, category_id, image_media_id, model_media_id, privacy_id, token) => {

    let body = {
      'user': parseInt(user_id),
      'name': String(name),
      'image_media': parseInt(image_media_id),
      'model_media': parseInt(model_media_id),
      'privacy': parseInt(privacy_id),
    };
    if (description) {
        body['description'] = description;
    }
    if (category_id) {
        body['category'] = category_id;
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
        `${baseURI}/models/`,
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

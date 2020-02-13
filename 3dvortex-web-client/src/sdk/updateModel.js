import { baseURI } from './config';

export const updateModel = (sucess, failure, modelId, name, description, image_media_id, model_media_id, category, privacy, token) => {

    let body = {}

    if (name) {
        body.name = String(name)
    }
    if (description) {
        body.description = String(description)
    }
    if (image_media_id) {
        body.image_media = parseInt(image_media_id)
    }

    if (model_media_id) {
        body.model_media = parseInt(model_media_id)
    }

    if (category) {
        body.category = parseInt(category)
    }

    if (privacy) {
        body.privacy = parseInt(privacy)
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
        `${baseURI}/models/${modelId}`,
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

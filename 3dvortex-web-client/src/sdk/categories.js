import { baseURI } from './config';

export const listCategories = (sucess, failure) => {

    fetch(`${baseURI}/categories/`).then(
        (resp) => {
            if (resp.ok){
                return resp.json();
            } else {
                resp.json().then(
                    (resp) => {
                        failure(resp.error_message);
                    }
                )
            }
        }
    ).then(
        (jsonResponse) => {sucess(jsonResponse);}
    )

}

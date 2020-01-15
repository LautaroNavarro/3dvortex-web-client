import { baseURI } from './config';

export default function api(uri, options = {}) {
  options.headers = {
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${token}`
  };
  return new Promise(
    (resolve, reject) => {
        fetch(`${baseURI}/${uri}`, options)
            .then(response => {
                if (response.status === 200) {
                return resolve(response.json);
            } else {
                return reject(response.json);
            }
      });
  });
}

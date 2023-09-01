
import {constants} from '@utils'
const {TOKEN_TYPE} = constants
const {BASIC_TOKEN, HOST_NAME} = process.env

export default (path: string, data: any, method = 'POST', tokenType = TOKEN_TYPE.BASIC, token = BASIC_TOKEN  ) => {
    let url = `${HOST_NAME}${path}`;
    return new Promise(async function (resolve, reject) {

        let option = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${tokenType} ${token}`,
            }
        };
        if (method.toUpperCase() == 'POST') {
            if (data) {
            }
            Object.assign(option, { body: JSON.stringify(data) });
        }
        fetch(url, option).then((response) => {
            try {
                return response.json();
            } catch (err) {
                reject({ err: 2, msg: 'Session expired' });
            }
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject({ err: 1, msg: err.message });
        })

    });
}
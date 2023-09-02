
import {constants} from '@utils'
const {TOKEN_TYPE} = constants

export default (path: string, data: any, method = 'POST', tokenType = TOKEN_TYPE.BASIC, token = process.env.BASIC_TOKEN  ) => {
    // let url = `${process.env.HOST_NAME}${path}`;
    let url = `${'http//:localhost:1337/'}${path}`;
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
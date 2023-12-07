import {constants} from '@utils';
import {ApiResult} from 'src/models/api.types';
const {TOKEN_TYPE} = constants;

export const sendRequest = (
  path: string,
  data?: any,
  method = 'POST',
  tokenType = TOKEN_TYPE.BASIC,
  token = process.env.BASIC_TOKEN,
) => {
  // let url = `${process.env.HOST_NAME}${path}`;
  let url = `${'http://192.168.1.7:1337/'}${path}`;
  // let url = `${'http://192.168.32.106:1337/'}${path}`;
  return new Promise<ApiResult>(async function (resolve, reject) {
    let option = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${token}`,
      },
    };
    if (method.toUpperCase() == 'POST') {
      if (data) {
      }
      Object.assign(option, {body: JSON.stringify(data)});
    }
    fetch(url, option)
      .then(response => {
        try {
          return response.json();
        } catch (err) {
          return {err: 2, message: 'Session expired'};
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        return {err: 1, message: err.message};
      });
  });
};

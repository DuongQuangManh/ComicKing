import {helper} from './helper';
import CryptoJS from 'crypto-js';

export const createOrder = async (amount: number) => {
  let apptransid = helper.getCurrentDateYYMMDD() + '_' + new Date().getTime();

  let appid = process.env.ZALO_PAY_APP_ID;
  let appuser = 'ComicApp';
  let apptime = new Date().getTime();
  let embeddata = '{}';
  let item = '[]';
  let description = 'Merchant description for order #' + apptransid;
  let hmacInput =
    appid +
    '|' +
    apptransid +
    '|' +
    appuser +
    '|' +
    amount +
    '|' +
    apptime +
    '|' +
    embeddata +
    '|' +
    item;
  let mac = CryptoJS.HmacSHA256(hmacInput, process.env.ZALO_PAY_KEY1 || '');
  var order: any = {
    app_id: appid,
    app_user: appuser,
    app_time: apptime,
    amount: amount,
    app_trans_id: apptransid,
    embed_data: embeddata,
    item: item,
    description: description,
    mac: mac,
  };

  let formBody: any = [];
  for (let i in order) {
    var encodedKey = encodeURIComponent(i);
    var encodedValue = encodeURIComponent(order[i]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  try {
    const data = await fetch(process.env.ZALO_PAY_CREATE_ORDER_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    }).then(response => response.json());

    console.log(data);

    return {
      token: data.zp_trans_token,
      returnCode: data.return_code,
    };
  } catch (error) {
    console.log('error ', error);
    return null;
  }
};

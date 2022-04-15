import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const data = new SharedArray('commands', function () {
  return papaparse.parse(open('./10users.txt')).data;
  // return papaparse.parse(open('./test.csv')).data;
});

//Groups of commands with the same request bodies
const quote_cancel = ["QUOTE", "CANCEL_SET_BUY", "CANCEL_SET_SELL"];
const buy_set_sell = ["BUY", "SELL", "SET_BUY_AMOUNT", "SET_BUY_TRIGGER", "SET_SELL_AMOUNT", "SET_SELL_TRIGGER"];
const commit_cancel = ["COMMIT_BUY", "CANCEL_BUY", "COMMIT_SELL", "CANCEL_SELL", "DISPLAY_SUMMARY"];

export const options = {
  // vus: 10,
  // maxDuration: '60m'
  // duration: '10s'
  scenarios: {
    scenario1: {
      executor: 'shared-iterations',
      maxDuration: '60m',
    },
  },
};

export default function () {
  const base_url = "http://localhost:4000/";
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let payload = {};

  for (let i = 0; i < data.length; i++) {
    let cmd0 = data[i][0].split(' ')[1];
    let cmd = cmd0.replace('_', '').replace('_', '');
    if (cmd == "ADD") {
      payload = {
        userid: data[i][1].trim(),
        amount: parseFloat(data[i][2]),
      };
      // console.log(payload['userid']);
    }
    else if (quote_cancel.includes(cmd0)) {
      payload = {
        userid: data[i][1].trim(),
        stock: data[i][2].trim(),
      };
    }
    else if (buy_set_sell.includes(cmd0)) {
      payload = {
        userid: data[i][1].trim(),
        stock: data[i][2].trim(),
        amount: parseFloat(data[i][3]),
      };
    }
    else if (commit_cancel.includes(cmd0)) {
      payload = {
        userid: data[i][1].trim(),
      };
    }
    else if (cmd0 == "DUMPLOG") {
      if (data[i].length == 3) {
        cmd = "USERDUMPLOG";
        payload = {
          userid: data[i][1].trim(),
          filename: data[i][2].trim(),
        };
      }
      else {
        payload = {
          filename: data[i][1].trim(),
        };
      }
    }
    const url = base_url.concat(cmd);
    // console.log(url);
    // console.log(JSON.stringify(payload));
    // console.log(params);
    http.post(url, JSON.stringify(payload), params);
  } //end for

};

// export default function () {
//   const url = "http://localhost:4000/getstocks";
//   const payload = JSON.stringify({
//     userid: "621f0a04cf26232d800784b4",
//   });
//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   for (let i = 0; i < 100; i++) {
//     http.post(url, payload, params);
//   }
//   // sleep(1);
// };
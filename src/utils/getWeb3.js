import { thorify } from 'thorify';
import { extend } from "thorify/dist/extend";

const Web3 = require('web3');

const getWeb3 = new Promise((resolve) => {
  window.addEventListener('load', (dispatch) => {
    if (typeof thor !== 'undefined') {
      const web3 = new Web3(window.thor);
      extend(web3);
      resolve(web3);
    } else {
      const web3 = thorify(new Web3(), "http://localhost:8669");
      resolve(web3);
    }
  });
});

export default getWeb3;
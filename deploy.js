const Giveaway = require('./build/contracts/Giveaway.json');
const thorify = require('thorify').thorify;
const Web3 = require("web3");

const web3 = thorify(new Web3(), "http://localhost:8669");

const contractInstance = new web3.eth.Contract(Giveaway.abi);

contractInstance.deploy({
  data: Giveaway.bytecode
}).send({
  from: '0x0489a3fff1930b85f1d73eff8a4699281aadb558',
  gas: 1500000,
}).then(data => {
  console.log(data);
}).catch(error => {
  console.log(error);
});



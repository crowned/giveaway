import Giveaway from '../build/contracts/Giveaway.json';
import getWeb3 from '../utils/getWeb3';

const address = '0x538ef847fe27c503121dd61d8310ab5b81932286';

export const loadWeb3 = () => {
  return dispatch => {
    return dispatch({
      type: 'WEB3_INITIALIZED',
      payload: getWeb3,
    }).then(() => {
      dispatch(getAccounts());
    });
  };
};

export const getBalance = () => {
  return (dispatch, getState) => {
    const { Contract } = getState().giveaway;

    const { getBalance } = Contract.methods;

    return dispatch({
      type: 'GET_BALANCE',
      payload: getBalance().call(),
    });
  };
}

export const getAccounts = () => {
  return (dispatch, getState) => {
    const { web3 } = getState().web3;

    return dispatch({
      type: 'GET_ACCOUNTS',
      payload: web3.eth.getAccounts(),
    })
    .then(() => dispatch(loadContracts()))
    .catch(err => err);
  };
};

export const loadContracts = web3 => {
  return (dispatch, getState) => {
    const { web3 } = getState().web3;
    const GiveawayContract = new web3.eth.Contract(Giveaway.abi, address);

    return dispatch({
      type: "LOAD_CONTRACTS",
      payload: GiveawayContract,
    });
  };
};

export const onWinner = () => {
  return (dispatch, getState) => {

    return dispatch({
      type: 'WINNER'
    });
  };
};

export const fetchReward = () => {
  return (dispatch) => {
    return dispatch({
      type: 'FETCH_REWARD',
    });
  };
};

export const reserveSpot = () => {
  return async (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { accounts } = getState().accounts;
    const { spotCost: value } = getState().status;

    const { reserveSpot } = Contract.methods;

    const data = { from: accounts[0], value };

    const fn = reserveSpot();
    const gas = await fn.estimateGas(data);

    return dispatch({
      type: 'RESERVE_SPOT',
      payload: fn.send({ ...data, gas }),
    });
  };
};

export const startGiveaway = (numSpots, spotCost) => {
  return async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const { Contract } = getState().giveaway;
    const { accounts } = getState().accounts;

    const { startGiveaway } = Contract.methods;
    const value = web3.utils.toWei(spotCost, 'ether');

    const data = { from: accounts[0], value };

    const fn = startGiveaway(numSpots, value);
    const gas = await fn.estimateGas(data);

    return dispatch({
      type: 'START_GIVEAWAY',
      payload: fn.send({ ...data, gas }),
    });
  };
};

export const endGiveaway = () => {
  return async (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { endGiveaway } = Contract.methods;
    const { accounts } = getState().accounts;

    const data = { from: accounts[0] };

    const fn = endGiveaway();
    const gas = await fn.estimateGas(data);

    return dispatch({
      type: 'END_GIVEAWAY',
      payload: endGiveaway().send({...data, gas }),
    });
  };
};

export const getEnergy = () => {
  return (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { getEnergy } = Contract.methods;

    return dispatch({
      type: 'GET_ENERGY',
      payload: getEnergy().call(),
    });
  };
};

export const getStatus = () => {
  return (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { getGiveawayStatus } = Contract.methods;

    return dispatch({
      type: 'GET_STATUS',
      payload: getGiveawayStatus().call(),
    });
  };
};

export const getParticipants = () => {
  return (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { getPlayers } = Contract.methods;

    return dispatch({
      type: 'GET_PARTICIPANTS',
      payload: getPlayers().call(),
    });
  };
};

export const getWinners = () => {
  return (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { getWinners } = Contract.methods;

    return dispatch({
      type: 'GET_WINNERS',
      payload: getWinners().call(),
    });
  };
};

export const spotReserved = () => {
  return (dispatch, getState) => {

    // return dispatch({
    //   type: 'SPOT_RESERVED',
    // });
  }
};

export const isOwner = account => {
  return async (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { accounts } = getState().accounts;
    const owner = await Contract.methods.owner().call();
    const account = accounts[0];

    return owner === account;
  }
};

export const withdraw = () => {
  return async (dispatch, getState) => {
    const { Contract } = getState().giveaway;
    const { accounts } = getState().accounts;
    const { withdraw } = Contract.methods;

    const data = { from: accounts[0] };

    const fn = withdraw();
    const gas = await fn.estimateGas(data);

    return dispatch({
      type: 'REFUND',
      payload: fn.send({ ...data, gas })
    })
  }
}

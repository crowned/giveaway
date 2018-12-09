import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import participants from './participants';
import registered from './registered';
import accounts from './accounts';
import giveaway from './giveaway';
import balance from './balance';
import winners from './winners';
import energy from './energy';
import status from './status';
import reward from './reward';
import spots from './spots';
import web3 from './web3';

export default (history) => combineReducers({
  router: connectRouter(history),
  participants,
  registered,
  accounts,
  giveaway,
  balance,
  winners,
  energy,
  status,
  reward,
  spots,
  web3,
});

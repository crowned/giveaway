import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import participants from './participants';
import accounts from './accounts';
import giveaway from './giveaway';
import winners from './winners';
import energy from './energy';
import status from './status';
import reward from './reward';
import spots from './spots';
import web3 from './web3';

export default (history) => combineReducers({
  router: connectRouter(history),
  participants,
  accounts,
  giveaway,
  winners,
  energy,
  status,
  reward,
  spots,
  web3,
});

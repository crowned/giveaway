import { connect } from 'react-redux';

import {
  loadWeb3,
  onWinner,
  getAccounts,
  spotReserved,
} from '../actions';
import App from '../components/App';

const mapStateToProps = ({ web3, giveaway, accounts }) => ({ web3, giveaway, accounts });

const AppContainer = connect(mapStateToProps, {
  onWinner,
  getAccounts,
  spotReserved,
  onLoad: loadWeb3,
})(App);

export default AppContainer;

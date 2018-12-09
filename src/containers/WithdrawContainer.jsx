import { connect } from 'react-redux';

import {
  withdraw,
  getBalance,
} from '../actions';

import Withdraw from '../components/Withdraw';

const mapStateToProps = ({
  web3,
  status,
  balance,
  registered,
}) => ({
  web3,
  status,
  balance,
  registered,
});

const WinnersContainer = connect(mapStateToProps, {
  withdraw, 
  getBalance,
})(Withdraw);

export default WinnersContainer;

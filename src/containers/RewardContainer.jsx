import { connect } from 'react-redux';

import { getEnergy } from '../actions';
import Reward from '../components/Reward';

const mapStateToProps = ({
  energy,
  web3,
  Contract,
}) => ({
  energy,
  web3,
  Contract,
});

const RewardContainer = connect(mapStateToProps, {
  onLoad: getEnergy,
})(Reward);

export default RewardContainer;

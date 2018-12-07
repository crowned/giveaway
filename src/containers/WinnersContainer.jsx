import { connect } from 'react-redux';

import { getWinners } from '../actions';
import Winners from '../components/Winners';

const mapStateToProps = ({ winners }) => ({ winners });

const WinnersContainer = connect(mapStateToProps, { getWinners })(Winners);

export default WinnersContainer;

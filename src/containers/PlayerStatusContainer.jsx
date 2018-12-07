import { connect } from 'react-redux';

import PlayerStatus from '../components/PlayerStatus';

const mapStateToProps = ({ participants, accounts }) => ({ participants, accounts });

const PlayerStatusContainer = connect(mapStateToProps)(PlayerStatus);

export default PlayerStatusContainer;

import { connect } from 'react-redux';

import { getParticipants } from '../actions';
import Participants from '../components/Participants';

const mapStateToProps = ({ participants }) => ({ participants });

const ParticipantsContainer = connect(mapStateToProps, { getParticipants })(Participants);

export default ParticipantsContainer;

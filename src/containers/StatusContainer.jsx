import { connect } from 'react-redux';

import { getStatus } from '../actions';
import Status from '../components/Status';

const mapStateToProps = ({ status, web3 }) => ({ status, web3 });

const StatusContainer = connect(mapStateToProps, { onLoad: getStatus })(Status);

export default StatusContainer;

import { connect } from 'react-redux';

import { startGiveaway, endGiveaway } from '../actions';
import AdminPanel from '../components/AdminPanel';

const mapStateToProps = ({ web3 }) => ({ ...web3 });

const AdminPanelContainer = connect(mapStateToProps, {
  endGiveaway,
  startGiveaway,
})(AdminPanel);

export default AdminPanelContainer;

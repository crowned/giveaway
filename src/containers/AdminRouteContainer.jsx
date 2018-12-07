import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isOwner, getAccounts } from '../actions';
import AdminRoute from '../components/AdminRoute';

const mapStateToProps = ({ accounts }) => ({ ...accounts });

const AdminRouteContainer = connect(mapStateToProps, { isOwner, getAccounts })(AdminRoute);

export default withRouter(AdminRouteContainer);

import { connect } from 'react-redux';

import Notification from '../components/Notification';

const mapStateToProps = ({
  spots,
  accounts,
}) => ({
  spots,
  accounts,
});

const NotificationContainer = connect(mapStateToProps)(Notification);

export default NotificationContainer;

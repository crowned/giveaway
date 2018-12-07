import React, { Component, Fragment } from 'react';
import { AuthRoute } from 'react-router-auth'
import _ from 'lodash';

import Admin from '../../scenes/Admin';

class AdminRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };

    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  componentWillReceiveProps({ accounts }) {
    if (_.isEqual(this.props.accounts, accounts)) {
      this.isAuthenticated();
    }
  }

  isAuthenticated = async () => {
    const isAuthenticated = await this.props.isOwner();
    this.setState({ isAuthenticated });
  }

  render() { 
    const { isAuthenticated } = this.state;

    return (
      <Fragment>
        <AuthRoute path="/admin" component={Admin} redirectTo="/" authenticated={isAuthenticated} />
      </Fragment>
    );
  }
}
 
export default AdminRoute;

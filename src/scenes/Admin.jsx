import React, { Component } from 'react';

import AdminPanelContainer from '../containers/AdminPanelContainer';
import Container from '../components/Container';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Container>
        <AdminPanelContainer />
      </Container>
    );
  }
}
 
export default Admin;
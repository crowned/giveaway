import React, { Component } from 'react';

import ParticipantsContainer from '../containers/ParticipantsContainer';
import PlayerStatusContainer from '../containers/PlayerStatusContainer';
import NotificationContainer from '../containers/NotificationContainer';
import WinnersContainer from '../containers/WinnersContainer';
import RewardContainer from '../containers/RewardContainer';
import StatusContainer from '../containers/StatusContainer';


import Instructions from '../components/Instructions';
import Container from '../components/Container';
import AdminLink from '../components/AdminLink';
import Footer from '../components/Footer';

class Home extends Component {
  render() {
    return (
      <Container>
        <AdminLink />
        <NotificationContainer />
        <RewardContainer />
        <PlayerStatusContainer />
        <Instructions />
        <StatusContainer />
        <ParticipantsContainer />
        <WinnersContainer />
        <Footer />
      </Container>
    )
  }
}
 
export default Home;

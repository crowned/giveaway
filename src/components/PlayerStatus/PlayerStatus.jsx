import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Wrapper = styled.div`
`;

const Spacer = styled.div`
  background-image: linear-gradient(to right, #0D2484 10%, rgba(13, 36, 132, 0) 0%);
  background-position: top;
  background-size: 10px 1px;
  background-repeat: repeat-x;
  display: block;
  height: 1px;
  margin-right: 10px;
  width: 100%;
`;

const Status = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  position: relative;

  h4 {
    color: #FFB1A3;
    font-weight: normal;
    margin: 5px;
    padding: 3px 5px;
  }
`;

class PlayerStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: props.accounts,
      participants: props.participants,
      isPlaying: false,
    }

    this.getPlayerStatus = this.getPlayerStatus.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  componentWillReceiveProps({ participants }) {
    this.setState({ participants }, () => {
      this.getPlayerStatus();
    });
  }

  getPlayerStatus() {
    const { accounts } = this.props.accounts;
    const { participants } = this.props.participants;

    const isPlaying = participants.includes(accounts[0]);

    this.setState({ isPlaying });
  }

  withdraw() {
    this.props.withdraw();
  }

  render() { 
    const { accounts } = this.props.accounts;
    const { isPlaying } = this.state;
    return (
      <Wrapper>
        <Spacer />

        <Status>
          <small>your address:</small>
          <h4>{ accounts[0] }</h4>

          { isPlaying ? 
            <small>your spot is reserved</small> :
            <small>you are not participating</small>
          }

        </Status>

        <Spacer />
      </Wrapper>
    );
  }
}
 
export default PlayerStatus;

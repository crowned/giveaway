import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: left;
  width: 100vw;
`;

const Text = styled.div`
  color: #ffffff;
  border-bottom: 2px solid #FFB1A3;
  font-size: 4em;
  font-family: 'Barlow';
  font-weight: 700;
  -webkit-text-stroke: 2px #0D2484;
`;

const Subtitle = styled.div`
  font-family: 'Space Mono';
  font-weight: 700;
  font-size: 0.8em;
  color: #0D2484;
  margin-top: 10px;
`;

class AccountUnavailable extends Component {
  render() { 
    return (
      <Wrapper>
        <div>
          <Text>Account Unavailable</Text>
          <Subtitle>Please select an account from Comet</Subtitle>
        </div>
      </Wrapper>
    );
  }
}
 
export default AccountUnavailable;

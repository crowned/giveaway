import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const Loader = styled.div`
  color: #ffffff;
  border-bottom: 2px solid #FFB1A3;
  font-size: 4em;
  font-family: 'Barlow';
  font-weight: 700;
  -webkit-text-stroke: 2px #0D2484;
`;

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Wrapper>
        <Loader>Loading...</Loader>
      </Wrapper>
    );
  }
}
 
export default Loading;

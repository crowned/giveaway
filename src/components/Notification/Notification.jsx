import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  background: transparent;
  border: 1px solid #0D2484;
  color: #0D2484;
  left: 0;
  padding: 12px;
  position: fixed;
  top: 230px;
  transform: translate(-100%, 0);
  transition: transform 0.09s ease-in;

  ${({ isOpen }) => isOpen && css`
    transform: translate(20px, 0);
  `}
`;

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spotReserved: false,
    };

    this.close = this.close.bind(this);
  }

  componentWillReceiveProps({ spots }) {
    if (this.props.spots.spotReserved !== spots.spotReserved) {
      this.setState({ spotReserved: spots.spotReserved }, this.close);
    }
  }

  close() {
    setTimeout(() => {
      this.setState({
        spotReserved: false,
      });
    }, 5000);
  }

  render() { 
    const { spotReserved } = this.state;

    return (
      <Wrapper isOpen={spotReserved}>
        { spotReserved ? 'spot reserved!' : 'error' }
      </Wrapper>
    );
  }
}
 
export default Notification;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  right: 5px;
  top: 5px;

  a {
    background-color: transparent;
    border: 1px solid transparent;
    display: block;
    height: 20px;
    width: 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);;
    }
  }
`;

class AdminLink extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Wrapper>
        <Link to="/admin" />
      </Wrapper>
    );
  }
}
 
export default AdminLink;

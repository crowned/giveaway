import React, { Component } from 'react';
import styled from 'styled-components';
import Container from '../Container';

const Wrapper = styled.div`
  padding: 12px 0;
  text-align: right;
  margin-top: 100px;

  a {
    color: #0D2484;
    text-decoration: none;

    &:hover {
      border-bottom: 1px solid #0D2484;
    }
  }
`;

class Footer extends Component {
  render() { 
    return (
      <Wrapper>
        <Container>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/Raleigh_CA">
            <small>@Raleigh_CA</small>
          </a>
        </Container>
      </Wrapper>
    );
  }
}
 
export default Footer;

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Bolt } from '../icons/';

import Button from '../Button';
import Container from '../Container';

const StyledHeader = styled.header`
  background-color: #0D2484;
  display: flex;
  font-family: 'Space Mono';
  font-size: 0.8rem;
  font-weight: 700;
  padding: 3em 1.5rem;
  margin-bottom: 50px;
  position: relative;
`;

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.div`
  width: 30px;
  /* margin: 0 10px; */

  svg {
    fill: #FFB1A3;
    width: 100%;
  }
`;

const Title = styled.div`
  position: relative;

  h1 {
    font-size: 4em;
    font-family: 'Barlow';
    font-weight: 700;
    margin: 0;
    margin-bottom: 30px;
    text-transform: uppercase;

    a {
      align-items: center;
      color: #0D2484;
      display: flex;
      justify-content: center;
      text-decoration: none;
      -webkit-text-stroke: 1px #FFB1A3;
      transition: all 0.1s linear;
    }

    &:hover {
      a {
        text-decoration: none;
        color: #FFB1A3;
      }
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.reserveSpot();
  }

  render() { 
    return (
      <Fragment>
        <StyledHeader>
          <Container>
            <Wrapper>
              <Title>
                <h1>
                  <Link to="/">
                    The VTHO Giveaway
                    {/* <Image>
                      <Bolt />
                    </Image> */}
                  </Link>
                </h1>
              </Title>
              <div>
                <Button onClick={this.handleClick}>
                  Reserve your spot
                </Button>
              </div>
            </Wrapper>
          </Container>
        </StyledHeader>
      </Fragment>
    );
  }
}
 
export default Header;

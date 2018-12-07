import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #FFB1A3;
  color: #FFB1A3;
  cursor: pointer;
  font-family: 'Space Mono';
  font-size: 0.8rem;
  font-weight: 700;
  padding: 12px;
  position: relative;
  z-index: 2;

  &::before {
    content: "";
    display: block;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    z-index: -1;
  }

  &:hover {
    background-color: #FFB1A3;
    color: #0D2484;

    &::before {
      background-color: #F77949;
      top: 5px;
      left: -5px;
    }
  }

  &:active {
    color: #ffffff;

    &:before {
      top: 0px;
      left: 0px;

    }
  }

  ${({ warning }) => warning && css`
    &:hover {
      color: #fff;

      &::before {
        background-color: #C62D1D;
      }
    }
  `}
`;

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick } = this.props;

    if (onClick) {
      this.props.onClick();
    }
  }

  render() { 
    const { type, warning } = this.props;
    return (
      <StyledButton
        type={type}
        warning={warning}
        onClick={this.handleClick}>

        { this.props.children }

      </StyledButton>
    );
  }
}
 
export default Button;

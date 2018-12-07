import React, { Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledInputGroup = styled.div`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
`;

const StyledInputItem = styled.div`
  flex: 1;
  margin: 10px;
`;

const StyledFooter = styled.div`
  justify-content: space-between;
  display: flex;
`;

export const InputGroup = ({ children }) =>  (
  <StyledInputGroup>
    { children }
  </StyledInputGroup>
);

export const InputItem = ({ children }) => (
  <StyledInputItem>
    { children }
  </StyledInputItem>
);

export const Footer = ({ children }) => (
  <StyledFooter>
    { children }
  </StyledFooter>
);

export default class Form extends Component {
  render() {
    const { children, onSubmit } = this.props;

    return (
      <StyledForm onSubmit={onSubmit}>
        { children }
      </StyledForm>
    );
  }
}

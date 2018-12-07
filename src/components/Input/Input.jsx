import React, { Component } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid #0D2484;
  color: #0D2484;
  font-family: 'Space Mono';
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 12px;
  width: 100%;

  ::-webkit-input-placeholder {
    color: #0D2484;
  }
  ::-moz-placeholder {
    color: #0D2484;
  }
  :-ms-input-placeholder {
    color: #0D2484;
  }
  :-moz-placeholder {
    color: #0D2484;
  }
`;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;

    this.setState({ value }, () => {
      this.props.onChange(value)
    });
  }

  render() { 
    const { value } = this.state;
    const { placeholder, type } = this.props;

    return (
      <StyledInput
        value={value}
        type={type}
        onChange={this.onChange}
        placeholder={placeholder} />
    );
  }
}
 
export default Input;

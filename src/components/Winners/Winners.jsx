import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const Winner = styled.div`
  align-items: baseline;
  display: flex;
  margin-bottom: 20px;
`;

const Address = styled.div`
  color: #0D2484;
  cursor: pointer;
  padding: 2px 4px;

  &:hover {
    text-decoration: underline;
  }
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

const Highlight = styled.span`
  font-weight: 700;
`;

class Winners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winners: props.winners,
    };

    this.highlight = this.highlight.bind(this);
  }

  componentWillReceiveProps({ winners }) {
    if (!_.isEqual(this.props.winners, winners)) {
      this.setState({ winners });
    }
  }

  componentDidMount() {
    this.props.getWinners();
  }

  highlight(address) {
    const length = address.length;
    const firstTwo = address.substring(0, 2);
    const middle = address.substring(2, length - 2);
    const lastTwo = address.substring(length - 2, length);

    return (
      <Fragment>
        <Highlight>{ firstTwo }</Highlight>
        <span>{ middle }</span>
        <Highlight>{ lastTwo }</Highlight>
      </Fragment>
    )
  }


  render() { 
    const { winners: { winners } } = this.state;

    return (
      <Wrapper>
        <h3>Previous Winners</h3>
        { winners.map(winner => (
          <Winner key={_.uniqueId()}>
            <Spacer />
            <Address>
              { this.highlight(winner) }
            </Address>
          </Winner>
        ))}
      </Wrapper>
    );
  }
}
 
export default Winners;

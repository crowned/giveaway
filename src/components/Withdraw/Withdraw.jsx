import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import styled from 'styled-components';
import _ from 'lodash';

import Button from '../Button';

const Wrapper = styled.div`
  margin: 40px 0;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 0;
`;

const Spacer = styled.div`
  background-image: linear-gradient(to right, #0D2484 10%, rgba(13, 36, 132, 0) 0%);
  background-position: top;
  background-size: 10px 1px;
  background-repeat: repeat-x;
  display: block;
  height: 1px;
  margin: 0 10px;
  width: 100%;
`;

class Withdraw extends Component {
  constructor(props) {
    super(props);

    const { web3 } = props.web3;
    this.web3 = web3;

    this.state = {
      balance: this.web3.utils.fromWei(props.balance, 'ether'),
      registered: props.registered,
    };

    this.setBalance = this.setBalance.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getBalance();
  }

  componentWillReceiveProps({ registered, balance }) {
    if (!_.isEqual(this.props.registered, registered)) {
      this.setState({ registered });
    }

    if (!_.isEqual(this.props.balance, balance)) {
      this.setBalance(balance);
    }
  }

  setBalance(balance) {
    this.setState({
      balance: this.web3.utils.fromWei(balance, 'ether'),
    });
  }

  handleClick() {
    this.props.withdraw();
  }

  render() { 
    const { balance } = this.state;
    const { status: { giveawayStatus }} = this.props;

    return (
      <Wrapper>
        <Spacer />

        <Content>
          <small>total vechain reserved</small>
          <FormattedNumber value={balance} minimumFractionDigits={2}>
            { string => (
              <h2>{ string }</h2>
            )}
          </FormattedNumber>
          { giveawayStatus ? 
            <small>you can withdraw your vtho once the beneficiary has been chosen</small> :
            <Button onClick={this.handleClick}>Withdraw</Button>
          }
        </Content>

        <Spacer />
      </Wrapper>
    );
  }
}
 
export default Withdraw;

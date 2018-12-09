import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';

const StyledReward = styled.div`
  font-family: 'Barlow';
  font-size: 3.5em;
  font-weight: 800;
`;

const Wrapper = styled.div`
  margin-bottom: 50px;
  text-align: center;
  width: 100%;
`;

class Reward extends Component {
  constructor(props) {
    super(props);

    const { web3 } = props.web3;
    this.web3 = web3;

    this.state = {
      reward: this.web3.utils.fromWei(props.energy, 'ether'),
    };

    this.pollReward = this.pollReward.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
    this.pollReward();
  }

  componentWillReceiveProps({ energy }) {
    if (this.props.energy !== energy) {
      this.setEnergy(energy);
    }
  }

  pollReward() {
    setInterval(() => {
      this.props.onLoad();
    }, 10000);
  }

  setEnergy(energy) {
    const reward = this.web3.utils.fromWei(energy, 'ether');

    this.setState({ reward });
  }

  render() { 
    const { reward } = this.state;

    return (
      <Wrapper>
        <StyledReward>
          <FormattedNumber value={reward} minimumFractionDigits={2}>
            { string => string }
          </FormattedNumber>
        </StyledReward>
        <small>estimated vtho generated</small>
      </Wrapper>
    );
  }
}

export default Reward;

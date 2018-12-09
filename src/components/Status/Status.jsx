import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  span {
    font-weight: 700;
    font-size: 1.2em;
  }
`;

const StyledStatus = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  label,
  span {
    white-space: nowrap;
  }
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

const Amount = styled.span`
  align-items: baseline;
  display: flex;

  small {
    margin-left: 3px;
  }
`;

class Status extends Component {
  constructor(props) {
    super(props);

    const { web3 } = props.web3;
    this.web3 = web3;

    this.state = {
      ...props.status,
    };

    this.setStatus = this.setStatus.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  componentWillReceiveProps({ status }) {
    if (this.props.status !== status) {
      this.setStatus(status);
    }
  }

  setStatus(status) {
    const { spotCost, ...rest } = status;

    this.setState({
      ...rest,
      spotCost: this.web3.utils.fromWei(spotCost.toString(), 'ether'),
    });
  }

  render() { 
    const {
      numSpots,
      availSpots,
      spotCost,
      canReserve,
      giveawayStatus,
    } = this.state;

    return (
      <Wrapper>
        <h3>Current Giveaway Status</h3>

        <StyledStatus>
          <label>Cost to Reserve a spot</label>
          <Spacer />
          <FormattedNumber value={spotCost} minimumFractionDigits={2}>
            { string => (
              <Amount>{ string }<small> vet</small></Amount>
            )}
          </FormattedNumber>
        </StyledStatus>
        <StyledStatus>
          <label>Beneficiary chosen</label>
          <Spacer />
          { giveawayStatus ?
            <span>Not yet</span> :
            <span>Yes check below</span>
          }
        </StyledStatus>
        <StyledStatus>
          <label>Giveaway status</label>
          <Spacer />
          { canReserve ?
            <span>Open</span> :
            <span>Closed</span>
          }
        </StyledStatus>
        <StyledStatus>
          <label>Total number of spots</label>
          <Spacer />
          <span>{ numSpots }</span>
        </StyledStatus>
        <StyledStatus>
          <label>Total number of players</label>
          <Spacer />
          <span>{ numSpots - availSpots }</span>
        </StyledStatus>
        <StyledStatus>
          <label>Available spots</label>
          <Spacer />
          <span>{ availSpots }</span>
        </StyledStatus>
      </Wrapper>
    );
  }
}
 
export default Status;

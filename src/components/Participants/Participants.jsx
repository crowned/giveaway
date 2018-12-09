import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const Participant = styled.div`
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

class Participants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: props.participants,
    };

    this.highlight = this.highlight.bind(this);
  }

  componentDidMount() {
    this.props.getParticipants();
  }

  componentWillReceiveProps({ participants }) {
    if (!_.isEqual(this.props.participants, participants)) {
      this.setState({ participants });
    }
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
    const { participants: { participants } } = this.state;

    return (
      <Wrapper>
        <h3>Current Players</h3>
        { participants.map(participant => (
          <Participant key={participant}>
            <Spacer />
            <Address>
              { this.highlight(participant) }
            </Address>
          </Participant>
        ))}
      </Wrapper>
    );
  }
}
 
export default Participants;

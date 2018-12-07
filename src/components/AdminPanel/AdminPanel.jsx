import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Form, { InputGroup, InputItem, Footer } from '../Form';

import Button from '../Button';

const Wrapper = styled.div`
  width: 100%;
`;

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numSpots: '',
      spotCost: '',
    };

    this.endGiveaway = this.endGiveaway.bind(this);
    this.setSpotCost = this.setSpotCost.bind(this);
    this.setNumOfSpots = this.setNumOfSpots.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { numSpots, spotCost } = this.state;

    this.props.startGiveaway(numSpots, spotCost);
  }

  endGiveaway() {
    this.props.endGiveaway();
  }

  setNumOfSpots(value) {
    this.setState({ numSpots: value })
  }

  setSpotCost(value) {
    this.setState({ spotCost: value });
  }

  render() { 
    const { numSpots, spotCost } = this.state;

    return (
      <Wrapper>
        <h2>Welcome Raleigh</h2>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <InputItem>
              <Input
                type="number"
                value={numSpots}
                onChange={this.setNumOfSpots}
                placeholder="Number Of Spots" />
            </InputItem>
            <InputItem>
              <Input
                type="number"
                value={spotCost}
                onChange={this.setSpotCost}
                placeholder="Spot Cost" />
            </InputItem>
          </InputGroup>
          <Footer>
            <Button type="submit" >Start Giveaway</Button>
            <Button type="button" warning onClick={this.endGiveaway}>End Giveaway</Button>
          </Footer>
        </Form>
      </Wrapper>
    );
  }
}
 
export default AdminPanel;

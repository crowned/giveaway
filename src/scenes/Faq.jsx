import React, { Component } from 'react';

import Container from '../components/Container';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Container>
        <h3>Who are you?</h3>
        <p>This project was created by <a href="https://twitter.com/Raleigh_CA" rel="noopener noreferrer">@Raleigh_CA</a>. I'm a software developer from all over the place.</p>
        <h3>What is your goal?</h3>
        <p>To share the love! 🥰 Well kinda, it's to help everyone get a bit extra vtho as well as help more learn more about blockchain based development.</p>
        <h3>Why cant the contract return the funds automatically?</h3>
        <p>It can, but it's not a good practice. If at least one address cannot receive VET, the whole transaction will be reverted. Meaning no one gets their funds which...sucks.</p>
      </Container>
    );
  }
}
 
export default Faq;

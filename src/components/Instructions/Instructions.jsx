import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 70px 0 50px 0;

  ol {
    padding-left: 24px;
  }

  li {
    margin-bottom: 12px;
  }
`;

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Wrapper>
        <h3>Instructions</h3>
        <ol>
          <li>Ensure there is at least one spot available for reservation. One spot per address</li>
          <li>By reserving a spot, you are securing your place in the VTHO Giveaway.</li>
          <li>Once all spots are purchased and an allotted time has passed, a random winner will be generated. All generated VTHO will be sent to that random winner minus the %10 fee.</li>
          <li>Once a random winner has been generated, all VET will be returned to its original owner.</li>
        </ol>
      </Wrapper>
    );
  }
}
 
export default Instructions;

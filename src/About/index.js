import React from 'react';
import Wrapper from './Wrapper';

class About extends React.Component {

  render() {

    return (
      <Wrapper className="page container-fluid">
        <div className="section">
          <h1>About this site</h1>
          <div className="section-content">
            <div className="block">
              <p>This is the default state of the Interra Catalog Front-end.</p>
              <p>This tool helps create open data catogs using React and other libraries.</p>
            </div>
            <div className="block info">
              <p>Update this about page before publishing. </p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default About;

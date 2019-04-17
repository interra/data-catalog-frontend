import React from 'react';
import Wrapper from './Wrapper';
import { FontAwesomeIcon } from 'interra-data-catalog-components';

class About extends React.Component {

  render() {

    return (
      <Wrapper className="page container-fluid">
        <div className="section">
          <h1>About this site</h1>
          <div className="section-content">
            <div className="block">
              <p>This is the default state of the Interra Catalog Front-end.</p>
              <p>This tool helps create open data catalogs using React and other libraries.</p>
            </div>
            <div className="block info">
              <p><FontAwesomeIcon icon="info-circle" fill="#27AAE1"/> Update this about page before publishing. </p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default About;

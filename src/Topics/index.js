import React from 'react';
import Wrapper from './Wrapper';

class Topics extends React.Component {
  render() {
    return (
      <Wrapper className="page container-fluid">
        <div className="section">
          <h1>Dataset Topics</h1>
          <div className="section-content">
            <div className="block">
              <p>This library provides the ability to add custom pages like topics, groups, etc.</p>
            </div>
            <div className="block">
               <p>Update this with text specific to your site. </p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default Topics;

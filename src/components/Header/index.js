import React from 'react';
import Wrapper from './Wrapper';
import logo from '../../assets/images/logo.svg';
import SearchInput from '../SearchInput';

const url = process.env.PUBLIC_URL;

class Header extends React.Component {

    render() {
      return (
        <Wrapper className="container-fluid">
          <div className="branding">
            <a className='logo' href="/"><img alt="logo" src={logo}/></a>
          </div>
          <SearchInput/>
        </Wrapper>
      );
    }
}

export default Header;

import React from 'react';
import { NavLink as RRlink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';
import Wrapper from './Wrapper';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Wrapper className="main-navigation">
        <Navbar expand="md navbar-dark">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto">
              <NavItem>
                <RRlink activeClassName="active" exact to="/">Home</RRlink>
              </NavItem>
              <NavItem>
                <RRlink activeClassName="active" to="/search">Datasets</RRlink>
              </NavItem>
              <NavItem>
                <RRlink activeClassName="active" to="/groups">Groups</RRlink>
              </NavItem>
              <NavItem>
                <RRlink activeClassName="active" to="/about">About</RRlink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Wrapper>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

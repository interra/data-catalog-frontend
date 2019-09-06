import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon, NavBar } from "interra-data-catalog-components";
import Layout from "../components/Layout";
import Wrapper from "../containers/about/Wrapper";
import links from "../assets/menu.json";

const About = ({path}) => (
  <Layout path={path} title="About">
    <NavBar
      navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
      customClasses="container-fluid main-navigation"  
    />
    <Wrapper className="page container-fluid">
      <div className="section">
        <h1>About this site</h1>
        <div className="section-content">
          <div className="block">
            <p>This is the default state of the DKAN data catalog.</p>
            <p>This tool helps create open data catalogs using React and other libraries.</p>
          </div>
          <div className="block info">
            <p><FontAwesomeIcon icon="info-circle" fill="#27AAE1"/> Update this about page before publishing. </p>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default About;

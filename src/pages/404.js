import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import NavBar from "interra-data-catalog-components";
import links from "../assets/menu.json";

export default ({path}) => (
  <Layout path={path} title="Page not found">
    <NavBar
      navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
      customClasses="container-fluid main-navigation"  
    />
    <div className="page container-fluid">
      <h1>Page not found.</h1>
    </div>
  </Layout>
);
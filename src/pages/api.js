import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import NavBar from "interra-data-catalog-components";
import ApiDocs from "../components/ApiDocs";
import links from "../assets/menu.json";

const ApiDocsFull = ({path}) => (
  <Layout path={path} title="DKAN API Documentation">
    <NavBar
      navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
      customClasses="container-fluid main-navigation"  
    />
    <div className="page container-fluid">
      <div className="section">
        <h1>DKAN API Documentation</h1>
        {typeof window !== `undefined` &&
          <ApiDocs />
        }
      </div>
    </div>
  </Layout>
);

export default ApiDocsFull;

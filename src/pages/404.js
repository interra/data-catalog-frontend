import React from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";

export default ({path}) => (
  <Layout path={path} title="Page not found">
    <NavBar />
    <div className="page container-fluid">
      <h1>Page not found.</h1>
    </div>
  </Layout>
);
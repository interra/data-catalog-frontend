import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../containers/topics/Wrapper";
import NavBar from "../components/NavBar";
import ApiDocs from "../components/ApiDocs";

const ApiDocsFull = ({path}) => (
  <Layout path={path} title="DKAN API Documentation">
    <NavBar />
    <Wrapper className="page container-fluid">
      <div className="section">
        <h1>DKAN API Documentation</h1>
        {typeof window !== `undefined` &&
          <ApiDocs />
        }
      </div>
    </Wrapper>
  </Layout>
);

export default ApiDocsFull;

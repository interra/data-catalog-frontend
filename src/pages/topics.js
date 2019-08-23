import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../containers/topics/Wrapper";
import NavBar from "../components/NavBar";

const Topics = ({path}) => (
  <Layout path={path} title="Topics">
    <NavBar />
    <Wrapper className="page container-fluid">
      <div className="section">
        <h1>Dataset Topics</h1>
        <div className="section-content">
          <div className="block">
            <p>This site provides direct access to the official data from the Centers for Medicare & Medicaid Services (CMS) that are used on the Medicare.gov Compare Websites and Directories. The goal of the site is to make CMS data readily available in open, accessible, and machine-readable formats.</p>
            <p>In addition to viewing the data in your browser, you can download the data in a variety of formats. You can also access the data through an Application Programming Interface, or API, which lets developers connect other applications to the data in real time using the same data we use to power the Medicare.gov website.</p>
          </div>
          <div className="block">
            <p>The data sets on this site are drawn from Medicare.gov's Compare Websites and Directories, which are briefly described below. Click on the data sets below to access the websites and tools directly. </p>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default Topics;

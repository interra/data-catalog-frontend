import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
// @TODO: Remove once https://github.com/swagger-api/swagger-ui/pull/5541 has
//   been merged and the swagger-ui-react package has been updated at npm.
import "../../assets/css/bootstrap-fix.css";

const ApiDocs = ({uuid}) => {

  const endpoint = "http://dkan/api/v1/docs";
  const url = uuid ? endpoint + "/" + uuid : endpoint;

  return (
    <SwaggerUI url={url} docExpansion="list"/>
  );
};

export default ApiDocs;

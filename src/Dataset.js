import React, { Component } from 'react';
import {Dataset as DatasetComponent} from 'interra-data-catalog-components'
const axios = require('axios');

class Dataset extends Component {

  state = {
    "item": {
      "resources": []
    }
  }

  componentDidMount() {
    console.log(this.props.id);

    axios.get("http://dkan.local/api/v1/dataset/" + this.props.id)
      .then(res => {

        const item = res.data;

        this.setState({ "item": item });
      });
  }

    render() {
        return (
          <DatasetComponent doc={this.state.item}/>
        );
    }
}

export default Dataset;

import React, { Component } from 'react';

import {HomePageIconList} from 'interra-data-catalog-components'

const axios = require('axios');

class Home extends Component {

    state = {
        "items": [],
        "state": "loading"
    }

    componentDidMount() {
        axios.get(`http://dkan.local/api/v1/organization`)
            .then(res => {
                const items = res.data.map(x => {
                    var item = {identifier: x}
                    return item
                });
                this.setState({ "items": items, "state": "ok" });
            });
    }

    render() {
        return (
          <HomePageIconList state={ this.state.state } items={ this.state.items } />
        );
    }
}

export default Home;

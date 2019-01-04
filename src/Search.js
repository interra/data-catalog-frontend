import React, { Component } from 'react';

import {SearchList} from 'interra-data-catalog-components'

const axios = require('axios');

class Home extends Component {

    state = {
        "items": [],
        "state": "loading"
    }

    componentDidMount() {
        axios.get(`http://dkan.local/api/v1/dataset`)
            .then(res => {



                const items = res.data.map(x => {
                    var themes = [
                        {
                            "identifier": 1,
                            "title": x.organization,
                            "icon": "x",
                            "link": "url"
                        }
                    ]

                    var distributions = x.resources.map(x => {
                        var item = {
                            identifier: 1,
                            format: x.type
                        }
                        return item;
                    });

                    var item = {
                        identifier: x.identifier,
                        title: x.title,
                        description: x.description,
                        modified: x.modified,
                        theme: themes,
                        format: distributions
                    }

                    return item
                });
                this.setState({ "items": items, "state": "ok" });
            });
    }

    render() {
        const message = this.state.items.length + " datasets out of " + this.state.items.length
        return (
            <SearchList message={message} state={ this.state.state } items={ this.state.items } />
        );
    }
}

export default Home;
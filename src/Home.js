import React, { Component } from 'react';

import { HomePageIconList } from 'interra-data-catalog-components';
import { Hero } from 'interra-data-catalog-components';
import backend from './services/backend';
import Loader from 'react-loader';

class Home extends Component {

	state = {
    "items": [],
		"loaded": false
	}

  async fetchData() {
		const { data } = await backend.get(`/collections/organization.json`);
		const items = data.map(x => {
			let item = {
				identifier: x.name,
        ref: `search?org=${x.name}`,
        title: x.name,
        icon: x.image,
			}
			return item
		});
		this.setState({
      items,
      "loaded": true
    });
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
    const { items, loaded } = this.state;

		return (
			<>
				<Hero/>
				<Loader loaded={loaded}>
					<HomePageIconList items={ items } />
				</Loader>
			</>
		);
	}
}

export default Home;

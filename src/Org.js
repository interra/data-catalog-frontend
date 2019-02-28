import React, { Component } from 'react';
import Search from "./Search"
import backend from './services/backend';
import Loader from 'react-loader';
const url = process.env.PUBLIC_URL;

class Home extends Component {

  state = {
    item: {},
		selectedFacets: [],
    loaded: false
  }

  async fetchData() {
    const { data } = await backend.get("/collections/organization/" + this.props.id + ".json");
    const item = Object.assign(data);
		const selectedFacets = [["org", item.name]];

    this.setState({
      selectedFacets,
      item,
      loaded: true
    });
  }

  componentDidMount() {
    this.fetchData();
  }

	render() {
    const { item, loaded, selectedFacets } = this.state;
    const searchUrl = `${url}/organization/${this.props.id}`;
    const styles = {
      margin: '30px 30px 0px 30px',
      padding: '0px',
    };

		return (
      <Loader loaded={loaded}>
        <div className="page container-fluid" style={styles}>
            <div className="org-info">
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
        </div>
        <Search selectedFacets={selectedFacets} url={searchUrl} />
      </Loader>

		);
	}
}

export default Home;

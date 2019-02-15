import React, { Component } from 'react';
import Loader from 'react-loader';
import {SearchList} from 'interra-data-catalog-components';
import {InputLarge} from 'interra-data-catalog-components';
import {FacetList} from 'interra-data-catalog-components';
import search from './services/search';
const url = process.env.PUBLIC_URL;

class Search extends Component {

  state = {
    "items": [],
    "index": false,
    "loaded": false,
    "query" : "",
    "searchEngine": false,
    "facetsResults": []
  }

  facets = {
    "theme": {
      "label": "Category",
      "field": "theme.title"
    },
    "org": {
      "label": "Organization",
      "field": "publisher.name"
    },
    "keyword": {
      "label": "Tags",
      "field": "keyword.title"
    },
    "format": {
      "label": "Format",
      "field": "dataset.distribution.format"
    }
  };

  async fetchData() {
    const searchType = 'simpleSearch';
    const searchEngine = new search[searchType]();
    const index = await searchEngine.init();
    let facetsResults = await searchEngine.loadFacets(this.facets, index);
    const initialItems = await this.normalize(index);
    let items = initialItems;
    const params = new URLSearchParams(window.location.search);
    let query = "";
    let selectedFacets = [];

    for(let pair of params.entries()) {
      let term = pair[0];
      let value = pair[1];
      if (term === 'q') {
        query = value;
      }
      else {
        if (Object.keys(this.facets).includes(term)) {
          selectedFacets.push([term,value]);
        }
      }
    }
    if (query || selectedFacets.length > 0) {
      items = await searchEngine.query(query, selectedFacets, this.facets, index);
      facetsResults = await searchEngine.loadFacets(this.facets, items);
      items = await this.normalize(items);
    }

    this.setState({
      query,
      items,
      selectedFacets,
      facetsResults,
      index,
      searchEngine,
      "loaded": true
    });
  }

  async normalize(items) {
    return items.map(x => {
      let item = {
        publisher: x.doc.publisher.name,
        identifier: x.doc.identifier,
        modified: x.doc.modified,
        description: x.doc.description,
        title: x.doc.title,
        ref: `${url}/dataset/${x.doc.identifier}`,
      }
      return item;
    });
  }

  async onChange(field, value) {
    const { index, searchEngine, query, selectedFacets } = this.state;
    if (value === "" && query) {
      value = query;
    }
    const values = await searchEngine.query(value, selectedFacets, this.facets, index);
    const facetsResults = await searchEngine.loadFacets(this.facets, values);
    const items = await this.normalize(values);
    this.setState({query: value, items, facetsResults});
  }

  relevanceUpdate(event) {
    const { items, searchEngine } = this.state;
    const change = event.target.value;
    const sorted = searchEngine.sort(items, change);
    this.setState({items: sorted});
  }

  componentDidMount() {
    if (!this.state.index) {
      this.fetchData();
    }
  }

  render() {
    const { items, loaded, query, selectedFacets, facetsResults } = this.state;
    const message = query ? items.length + " datasets found for " + query : items.length + " datasets";
    const facets = this.facets;
    const facetListProps = {
      query,
      facets,
      url,
      facetsResults,
      selectedFacets,
    };

    return (
      <div className="containter-fluid m-5">
        <Loader loaded={loaded}>
        <div className="row">

            <div className="col-md-9 col-sm-12 p-5">
              <InputLarge onChange={this.onChange.bind(this)} value={this.state.query} facets={this.state.selectedFacets} />
              <SearchList message={message} items={items} />
            </div>
            <div className="col-md-3 col-sm-12 p-5">
              <select className="form-control input-sm" onChange={this.relevanceUpdate.bind(this)}>
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="alpha">Alphabetical</option>
              </select>
              <FacetList {... facetListProps} />
            </div>

        </div>
        </Loader>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-advanced';
import LoadingSpin from 'react-loading-spin';
import {SearchList} from 'interra-data-catalog-components';
import {InputLarge} from 'interra-data-catalog-components';
import {FacetList} from 'interra-data-catalog-components';
import search from './services/search';

const url = process.env.REACT_APP_INTERRA_BASE_URL;

const InitialState = {
  items: [{
    title: "loading",
    description: "loading"
  }],
  index: false,
  show: true,
  page: 0,
  query : "",
  searchEngine: false,
  facetsResults: {
    theme: [],
    keyword: [],
    format: []
  }
}

class Search extends Component {

  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = InitialState;
  }

  facets = {
    "theme": {
      "label": "Category",
      "field": "theme.0.title"
    },
    "keyword": {
      "label": "Tags",
      "field": "keyword.*.title"
    },
    "format": {
      "label": "Format",
      "field": "distribution.*.format"
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
      show: false
    });
  }

  async normalize(items) {
    return items.map(x => {

      let item = {}

      if(x.hasOwnProperty('doc')){
        item = {
          identifier: x.doc.identifier,
          modified: x.doc.modified,
          description: x.doc.description,
          theme: x.doc.theme,
          format: x.doc.distribution,
          title: x.doc.title,
          ref: `/dataset/${x.doc.identifier}`,
        }

        if (x.doc.hasOwnProperty('publisher') && x.doc.publisher.hasOwnProperty('name')) {
          item.publisher = x.doc.publisher.name
        }
        else {
          item.publisher = ' '
        }
      }

      return item

      /*let
      return item;*/
    });
  }

  async onChange(field, value) {
    const { index, selectedFacets } = this.state;
    const searchType = 'simpleSearch';
    const searchEngine = new search[searchType]();
    const values = await searchEngine.query(value, selectedFacets, this.facets, index);
    const facetsResults = await searchEngine.loadFacets(this.facets, values);
    const items = await this.normalize(values);
    this.setState({query: value, items, facetsResults});
  }

  relevanceUpdate(event) {
    const { items, searchEngine } = this.state;
    const change = event.target.value;
    const sorted = searchEngine.sort(items, change);
    this.setState({items: sorted, searchEngine});
  }

  componentDidMount() {
    if (!this.state.index) {
      this.fetchData();
    }
  }

  facetCallback(e) {
    this.setState({
      show: true,
      items: [{
        title: "loading",
        description: "loading"
      }]
    });
    this.fetchData();
  }

  render() {
    const { items, show, query, selectedFacets, facetsResults } = this.state;
    const message = query ? items.length + " datasets found for " + query : items.length + " datasets";
    const facets = this.facets;
    const facetCallback = this.facetCallback.bind(this);
    const facetListProps = {
      query,
      facets,
      facetsResults,
      selectedFacets,
      facetCallback,
      Link,
      url: "search"
    };

    return (
      <>

        <div className="search-page containter-fluid m-5">
          <div className="row">
            <div className="results-list col-md-9 col-sm-12 p-5">
              <InputLarge style={{border: "1px solid #ced4da"}} onChange={this.onChange.bind(this)} value={query} facets={selectedFacets} />
              <Loader hideContentOnLoad backgroundStyle={{backgroundColor: "#f9fafb"}} foregroundStyle={{backgroundColor: "#f9fafb"}} show={show} message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}>
                <SearchList link={Link} message={message} items={items} />
              </Loader>
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
        </div>
      </>
    );
  }
}

export default Search;

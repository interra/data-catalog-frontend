import backend from './backend';
import elasticlunr from 'elasticlunr';

//import elasticsearch from 'elasticsearch';

class Search {
  async init() {
    return {};
  }

  async resultCount() {}

  async query() {}
}

export class elasticLunr extends Search {
  async init() {
    const { data } = await backend.get(`/search-index.json`);
    const index = elasticlunr.Index.load(data);
    return index;
  }

  async query(query, selectedFacets, facets, index) {
    const items = index.search(query, {expand: true});
    return items;
  }

  async resultCount(results) {
    return results.length;
  }

  async getAll(index) {
    const docs = index.documentStore.docs;
    const items = Object.keys(docs).map(function(index) {
      var item = {
        doc: docs[index],
        ref: index,
        score: 1
      }
      return item;
    });
    return items;
  }

}

export class simpleSearch extends Search {
  async init() {
    const { data } = await backend.get(`/search-index.json`);
    return data;
  }

  async getAll(index) {
    return index;
  }

  async resultCount(results) {
    return results.length;
  }

  getFacetValueHelper(doc, field) {
    if ((typeof doc) == "object") {
      let pieces = field.split('.')
      let current = pieces.shift()

      if (current === '*') {
       if(Array.isArray(doc)) {
         let values = []
         let i

         let join = pieces.join('.')

         for (i = 0; i < doc.length; i++) {
           values = values.concat(this.getFacetValueHelper(doc, i + "." + join));
         }

         return values;
       }
       else {
         return [];
       }
      }

      if (doc[current] !== undefined) {
        // This is the property no need to recurse further.
        if (pieces.length === 0) {
          let value = doc[current]
          return [value]
        }
        else {
          return [].concat(this.getFacetValueHelper(doc[current], pieces.join('.')))
        }
      }
      else {
        return [];
      }
    }
    else {
      return []
    }
  }

  getFacetValue(doc, facet, facets) {
    let value = this.getFacetValueHelper(doc, facets[facet].field)
    return value
  }

  getFacetInitialTotal(facets, results) {

    const that = this;
    let facetsTotal = [];
    results.forEach((result) => {
      for (var facet in facets) {
        const docR = that.getFacetValue(result.doc, facet, facets);

        facetsTotal[facet] = !facetsTotal[facet] ? [] : facetsTotal[facet];
        // We want to flatten the results so there is one big array instead of a
        // combo of array results.
        if (Array.isArray(docR)) {
          docR.forEach((item, x) => { // eslint-disable-line no-loop-func
            facetsTotal[facet].push(item);
          });
        }
        else {
          if (docR && Object.keys(docR).length !== 0 ) {
            facetsTotal[facet].push(docR);
          }
        }
      }
    });
    return facetsTotal;
  }

  async loadFacets(facets, results) {
    const that = this;
    const pageSizeFacets = 10;
    const facetsTotal = that.getFacetInitialTotal(facets, results);

    var facetsResults = {};

    for (var facet in facets) {
      facetsResults[facet] = {};
      if (facetsTotal[facet]) {
        facetsTotal[facet].forEach((i) => { // eslint-disable-line no-loop-func
          facetsResults[facet][i] = (facetsResults[facet][i]||0)+1;
        });
      }
    };

    // TODO: separate into func.
    let facetsSorted = {};
    for (var fact in facets) {
      facetsSorted[fact] = [];
      facetsSorted[fact] = Object.entries(facetsResults[fact]).sort((a,b) => {
        return (a[1] > b[1]) ? -1 : ((b[1] > a[1]) ? 1 : 0)
      });
    };

    // TODO:
    let facetsPaged = {};
    for (var fac in facets) {
      facetsPaged[fac] = facetsSorted[fac].slice(0, pageSizeFacets);
    };
    return facetsPaged;
  }


  sort(index, sort) {
    const that = this;
    const items = index;
    if (sort === "date") {
      return items.sort(that.dateCompare);
    }
    else if (sort === "relavance") {
      //return items.sort(that.relatCompare);
      return items;
    }
    else if (sort === "alpha") {
      return items.sort(that.alphaCompare);
    }
    return items;
  }

  relatCompare(a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  dateCompare(a,b) {
    if (a.modified > b.modified)
      return -1;
    if (a.modified < b.modified)
      return 1;
    return 0;
  }

  alphaCompare(a,b) {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
  }

  async query(query, selectedFacets, facets, index) {
    let faceted = [];
    const that = this;
    if (selectedFacets && selectedFacets.length > 0) {
      selectedFacets.forEach((selectedFacet) => {
        let term = selectedFacet[0];
        let value = selectedFacet[1];
        faceted = index.filter((item) => {
          let facetValue = that.getFacetValue(item.doc, term, facets);
          if (Array.isArray(facetValue)) {
            if (Object.values(facetValue).indexOf(value) > -1) {
              return true;
            }
          }
          else if (facetValue === value) {
            return true;
          }
          return false;
        });
      });
    }
    else {
      faceted = index;
    }
    return faceted.reduce((acc, doc) => {
      const haystack = JSON.stringify(doc.doc);
      const needleRegExp = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
      const result = needleRegExp.test(haystack);
      if (result) {
        acc.push(doc);
      }
      return acc;
    }, []);
  }


}
/**
export class elasticSearch extends Search {
  *init() {
    const index = elasticsearch.Client({
      host: 'https://ENDPOINT.REGION.es.amazonaws.com/INDEX',
    });
    return index;
  }
  *query(query, index) {
    const docs = yield this.esSearch(query, index);
  }
  *getAll(index) {
    const that = this;
    const docs = yield this.esSearch("*", index);
    return docs;
  }
  esSearch(query, index) {
    const body = {
      "query": {
        "match": {
          "title": "*" + query + "*"
        }
      }
    };
    const that = this;
    return index.search({
      body: body
    }).then(function (docs) {
      that.count = docs.hits.total;
      const items = docs.hits.hits.map((index) => {
      const item = {
        doc: index._source,
        score: index._score,
        ref: index._source.interra.id,
      }
      return item;
    });
      return items;
    }, function (error) {
      console.trace(error.message);
    });
  }
  *resultCount(results) {
    return this.count;
  }
}
*/

const search = {
//  elasticSearch,
  simpleSearch,
  elasticLunr,
};

export default search;

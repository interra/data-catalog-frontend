import React, { Component } from 'react';
import Loader from 'react-loader';
import { Title } from 'interra-data-catalog-components';
import { Text } from 'interra-data-catalog-components';
import { Organization } from 'interra-data-catalog-components';
import { FileDownload } from 'interra-data-catalog-components';
import { Table } from 'interra-data-catalog-components';
import { Tags } from 'interra-data-catalog-components';
import DataTable from './components/DataTable';
//import toArray from 'stream-to-array'
import Papa from 'papaparse';

import backend from './services/backend';


class Dataset extends Component {

  state = {
    item: {},
    resources: [],
    loaded: false
  }

  async fetchData() {
    const { data } = await backend.get("/collections/dataset/" + this.props.id + ".json");
    const item = Object.assign(data);
    const resources = item.distribution;
    this.setState({
      item,
      resources,
      loaded: true
    });
    Promise.all(resources.map(async (resource) => { 
      if ('format' in resource && resource.format === 'csv') {
        const data = await this.fileRows(resource.downloadURL);
        resource.values = data;
        resource.columns = this.prepareColumns(data[0]);
      }
      return resource;
    })).then((resources) => {
      this.setState({
        resources
      });
    })
  }

  prepareColumns(item) {
    return Object.keys(item).map((i) => {
      return {
        Header: i,
        accessor: i 
      }
    });
  }
  

  componentDidMount() {
    this.fetchData();
  }

  async fileRows(url) {

    return new Promise((res, rej) => {
      
      Papa.parse(url, {
        complete: (data) => {
          res(data.data);
        },
        download: true,
        preview: 100,
        header: true
      });
    });
    //const resource = await DataJS.open(url);
   // const rowStream = await resource.rows({keyed: true})
   // const values = await toArray(rowStream)
    //return values; 
  }

  render() {
    const { item, loaded, resources } = this.state;

    const orgName = 'publisher' in item ? item.publisher.name : "";
    const orgImage = 'publisher' in item ? item.publisher.image : "";
    const orgId = 'publisher' in item ? item.publisher.identifier : "";
    const orgDesc = 'publisher' in item ? item.publisher.description : "";
    const tag = 'keyword' in item ? item.keyword : [];
    const theme = 'theme' in item ? item.theme : [];
    const contactName = 'contactPoint' in item ? item.contactPoint.fn : "";
    const contactEmail = 'contactPoint' in item ? item.contactPoint.hasEmail : "";
    const issued = 'issued' in item ? item.issued : "";
    const modified = 'modified' in item ? item.modified : "";
    const identifier = 'identifier' in item ? item.identifier : "";
    const accessLevel = 'accessLevel' in item ? item.accessLevel : "";
    const landingPage = 'landingPage' in item ? item.landingPage : "";
    const num_rows = 'datastore_statistics' in item ? item.datastore_statistics.rows : "";
    const num_columns = 'datastore_statistics' in item ? item.datastore_statistics.columns : "";
    const columns = 'columns' in item ? item.columns : [];

    const Resources = () => {
      return resources.map(r => {
        const values = 'values' in r ? r.values : [];
        const columns = 'columns' in r ? r.columns : [];
        const dataKey = `${r.title}-${r.format}`;
        if ('format' in r && r.format === 'csv') {
          return <div key={dataKey}><FileDownload resource={r} key={r.title}/><DataTable key={dataKey} data={values} columns={columns} /></div>;
        }
        return <div key={dataKey}><FileDownload resource={r} key={r.title}/></div>;
      });
    };

    const Topic = () => {
      return theme.map(t => {
        const topicLink = `<a className="theme" href="../search?theme=${t.title}">${t.title}</a>`;
        return <Text key={t} value={topicLink} />;
      });
    };

    let t1 = {};
    let t2 = {};

    if (orgName && orgName.length > 0) {
      t1.publisher = { label: "Publisher" };
      t2.publisher = orgName;
    }
    if (identifier.length > 0) {
      t1.identifier = { label: "Identifier" };
      t2.identifier = identifier;
    }
    if (issued.length > 0) {
      t1.issued = { label: "Issued" };
      t2.issued = issued;
    }
    if (modified.length > 0) {
      t1.modified = { label: "Last Update" };
      t2.modified = modified;
    }
    if (contactName.length > 0 && contactEmail.length > 0) {
      t1.conatct = { label: "Contact" };
      t2.conatct = `<a href="${contactEmail}">${contactName}</a>`;
    }
    if (accessLevel.length > 0) {
      t1.access = { label: "Public Access Level"};
      t2.access = accessLevel;
    }
    if (landingPage.length > 0) {
      t1.homepage = { label: "Homepage URL"};
      t2.homepage = `<a href="${landingPage}">${landingPage}</a>`;
    }

    const labelsT1 = {
      rows: {
        label: num_rows
      }
    }


    const valuesT1 = {
      rows: num_columns
    }


    var labelsT2 = {}

    var valuesT2 = {}

    columns.forEach((value, index) => {
      labelsT2[index] = {"label": value}
      valuesT2[index] = "String"
    })

    return (
      <div className="page container-fluid">
        <Loader loaded={loaded}>
        <div className="row">

          <div className="col-md-3 col-sm-12 p-5">
            <Organization name={orgName} image={orgImage} description={orgDesc} identifier={orgId} />
          </div>
          <div className="results-list col-md-9 col-sm-12 p-5">
            <Title title={item.title} />
            <div className="theme-wrapper">
              { Topic() }
            </div>
            <Text value={item.description} />
            { Resources() }
            <Tags tags={tag} />
            <Table configuration={labelsT1} data={valuesT1} title="What's in this Dataset?" th1="Rows" th2="Columns" />
            <Table configuration={labelsT2} data={valuesT2} title="Columns in this Dataset" th1="Column Name" th2="Type" />
            <Table configuration={t1} data={t2} />

          </div>

        </div>
        </Loader>
      </div>
    );
  }
}

export default Dataset;


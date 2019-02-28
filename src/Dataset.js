import React, { Component } from 'react';
import Loader from 'react-loader';
import { Title } from 'interra-data-catalog-components';
import { Text } from 'interra-data-catalog-components';
import { Organization } from 'interra-data-catalog-components';
import { FileDownload } from 'interra-data-catalog-components';
import { Table } from 'interra-data-catalog-components';
import { Tags } from 'interra-data-catalog-components';
import backend from './services/backend';


class Dataset extends Component {

  state = {
    item: {},
    loaded: false
  }

  async fetchData() {
    const { data } = await backend.get("/collections/dataset/" + this.props.id + ".json");
    const item = Object.assign(data);

    this.setState({
      item,
      loaded: true
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { item, loaded } = this.state;

    const orgName = 'publisher' in item ? item.publisher.name : "";
    const orgImage = 'publisher' in item ? item.publisher.image : "";
    const orgId = 'publisher' in item ? item.publisher.identifier : "";
    const orgDesc = 'publisher' in item ? item.publisher.description : "";
    const resource = 'distribution' in item ? item.distribution : [];
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
      return resource.map(r => {
        return <FileDownload resource={r} key={r.title}/>;
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

    if (orgName.length > 0) {
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


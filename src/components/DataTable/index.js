import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Loader from 'react-loader';

class DataTable extends React.Component {

    render() {
      const { data, columns } = this.props;
      const page = data.length > 10 ? 10  : data.length + 1;
      const loaded = data.length ? true : false;
      return (
        <Loader loaded={loaded}>
        <ReactTable
          data={data}
          defaultPageSize={page}
          columns={columns} />
        </Loader>
      );
    }
}

export default DataTable;

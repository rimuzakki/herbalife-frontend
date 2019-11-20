import React, { Component } from 'react';
import { Layout, Table } from 'antd';
import Api from './../../../Api';

const { Content } = Layout;

class TableStatus extends Component {
  constructor() {
    super()
    this.state = {
      statusByKelompok: [],
    }
  }

  componentDidMount() {
    this.getStatusCountByKelompok();
  }

  getStatusCountByKelompok = () => {
    Api.get('statusEntryCountByKelompok')
      .then(({ data }) => {
        console.log('get', data);
        this.setState({
          statusByKelompok: data,
        })
      }).catch(err => console.log(err))
  }

  render() {

    const columnsKelompok = [
      {
        title: 'Level',
        dataIndex: 'kelompok',
        key: 'kelompok',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Sudah Verifikasi',
        dataIndex: 'sudah',
        key: 'sudah',
      },
      {
        title: 'Belum Verifikasi',
        dataIndex: 'belum',
        key: 'belum',
      },
    ];

    const { statusByKelompok } = this.state;

    return (
      <Content style={{ padding: '0 50px', marginTop: 100 }}>
        <Table
          columns={columnsKelompok}
          dataSource={statusByKelompok}
        />
      </Content>
    );
  }
}

export default TableStatus;
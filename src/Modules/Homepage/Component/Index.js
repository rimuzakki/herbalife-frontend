import React, { Component } from 'react';
import { Layout, Table, Divider } from 'antd';
import Api from './../../../Api';

const { Content } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'nama_lengkap',
    key: 'nama_lengkap',
    render: text => <a>{text}</a>,
  },
  {
    title: 'ID Pendaftaran',
    dataIndex: 'id_peserta',
    key: 'id_peserta',
  },
  {
    title: 'ID Herbalife',
    dataIndex: 'id_herbalife',
    key: 'id_herbalife',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        {/* <a>Invite {record.name}</a> */}
        {/* <Divider type="vertical" /> */}
        <a>Delete</a>
      </span>
    ),
  },
];

class Index extends Component {
  constructor() {
    super()
    this.state = {
      pesertaData: [],
    }
  }

  componentDidMount() {
    this.getPesertaData();
  }

  getPesertaData = () => {
    Api.get('peserta')
      .then(({ data }) => {
        this.setState({
          pesertaData: data
        })
      }).catch(err => console.log(err))
  }


  render() {
    return (
      <Content style={{ padding: '0 50px', marginTop: 100 }}>
        <Table rowKey={'id'} columns={columns} dataSource={this.state.pesertaData} />
      </Content>
    );
  }
}

export default Index;
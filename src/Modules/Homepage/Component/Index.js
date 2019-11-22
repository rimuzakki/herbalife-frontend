import React, { Component } from 'react';
import { Layout, Table, Input, Button, Icon, message, Card, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import Api from './../../../Api';
import WrappedFormPeserta from './../../../Components/Layout/Partial/FormPeserta'


const { Content } = Layout;

class Index extends Component {
  constructor() {
    super()
    this.state = {
      pesertaData: [],
      searchText: '',
      visible: false,
      modalData: '',
      response: {},
      isAddUser: false,
      isEdituser: false,
      status: 'create',
      modalKey: Math.random(),
      statusTotal: '',
      statusSudah: '',
      statusBelum: '',
      statusAll: [],
      // statusByKelompok: [],
    }
  }

  componentDidMount() {
    this.getPesertaData();
    this.getStatusCount();
    this.getStatusCountByKelompok();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.statusAll === this.state.statusAll) {
      this.getStatusCount();
      // console.log('prev', prevState.statusAll);
      // console.log('now', this.state.statusAll)
    }

    // if (this.state.pesertaData && prevState.pesertaData !== this.state.pesertaData) {
    //   this.getPesertaData();
    // }
  }

  getPesertaData = () => {
    Api.get('peserta')
      .then(({ data }) => {
        // console.log('get', data);
        this.setState({
          pesertaData: data,
        })
      }).catch(err => console.log(err))
  }

  getStatusCount = () => {
    Api.get('statusEntryCount')
      .then(res => {
        // console.log('status', res.data[0]);
        this.setState({
          statusTotal: res.data[0].total,
          statusBelum: res.data[0].belum,
          statusSudah: res.data[0].sudah,
          statusAll: res.data[0],
        })
      }).catch(err => console.log(err))
  }

  getStatusCountByKelompok = () => {
    Api.get('statusEntryCountByKelompok')
      .then(({ data }) => {
        // console.log('get', data);
        this.setState({
          statusByKelompok: data,
        })
      }).catch(err => console.log(err))
  }

  editPesertaData = (values) => {
    Api.put('peserta', values)
      .then(result => {
        // console.log('resultPut', result);
        // console.log('resultPutData', result.data);
        this.getPesertaData();
        this.setState({
          response: result,
          isAddUser: false,
          isEdituser: false
        })
      }).catch(err => console.log(err))
  }

  createPesertaData = (values) => {
    Api.post('peserta', values)
      .then(result => {
        // console.log('resultPOST', result);
        // console.log('resultPOSTData', result.data);
        message.info('Peserta telah ditambahkan');
        this.getPesertaData();
        this.setState({
          response: result,
        })
      }).catch(err => console.log(err))
  }

  showModalEdit = (record) => {
    this.setState({
      visible: true,
      modalData: record,
      status: 'edit',
    });
  };

  showModalCreate = () => {
    this.setState({
      visible: true,
      modalData: [],
      status: 'create',
      modalKey: Math.random(),
    });
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { status } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (status === 'create') {
        // console.log('Received values of Create: ', values);
        this.createPesertaData(values);
      } else {
        // console.log('Received values of Edit: ', values);
        this.editPesertaData(values);
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  resetAll = () => {
    this.setState({ searchText: '' });
  }

  viewCard = () => {
    const { statusTotal, statusBelum, statusSudah } = this.state;
    return (
      <div className="status-box">
        <Row gutter={16}>

          <Col span={8}>
            <Card title="Total Data Peserta" bordered={false}>
              <h3>{statusTotal} Peserta</h3>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Sudah Verifikasi" bordered={false}>
              <h3>{statusSudah} Peserta</h3>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Belum Verifikasi" bordered={false}>
              <h3>{statusBelum} Peserta</h3>
            </Card>
          </Col>

        </Row>
      </div>
    )
  }


  render() {
    const columns = [
      {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
        // render: text => <a>{text}</a>,
        ...this.getColumnSearchProps('nama'),
      },
      {
        title: 'ID Herbalife',
        dataIndex: 'id_herbalife',
        key: 'id_herbalife',
        ...this.getColumnSearchProps('id_herbalife'),
      },
      {
        title: 'No telepon',
        dataIndex: 'no_telp',
        key: 'no_telp',
        ...this.getColumnSearchProps('no_telp'),
      },
      {
        title: 'Pentransfer',
        dataIndex: 'nama_transfer',
        key: 'nama_transfer',
        ...this.getColumnSearchProps('nama_transfer'),
      },
      // {
      //   title: 'Email',
      //   dataIndex: 'email',
      //   key: 'email',
      //   ...this.getColumnSearchProps('email'),
      // },
      {
        title: 'Hadir',
        dataIndex: 'hadir',
        key: 'hadir',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.hadir - b.hadir,
        render: (text, record) => (
          record.hadir === "1" ? "Hadir" : "Belum Hadir"
        ),
        // filters: [
        //   {
        //     text: 'Belum Hadir',
        //     value: ' ',
        //   },
        //   {
        //     text: 'Hadir',
        //     value: '1',
        //   },
        // ],
        // onFilter: (value, record) => record.hadir.indexOf(value) === 0,
      },

      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <span>
      //       {/* <a>Invite {record.name}</a> */}
      //       {/* <Divider type="vertical" /> */}
      //       <a onClick={() => this.showModal()}>Delete</a>
      //     </span>
      //   ),
      // },
    ];

    // const columnsKelompok = [
    //   {
    //     title: 'Level',
    //     dataIndex: 'kelompok',
    //     key: 'kelompok',
    //   },
    //   {
    //     title: 'Total',
    //     dataIndex: 'total',
    //     key: 'total',
    //   },
    //   {
    //     title: 'Sudah Verifikasi',
    //     dataIndex: 'sudah',
    //     key: 'sudah',
    //   },
    //   {
    //     title: 'Belum Verifikasi',
    //     dataIndex: 'belum',
    //     key: 'belum',
    //   },
    // ];

    const { pesertaData, modalData } = this.state;
    // console.log('searchText', searchText)
    return (
      <Content style={{ padding: '0 50px', marginTop: 100 }}>
        {this.viewCard()}
        <Button icon="plus" type="primary" className="btnCreate" onClick={this.showModalCreate}>
          Tambah Peserta
        </Button>
        <Table
          columns={columns}
          dataSource={pesertaData}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                // console.log('rowIndex', rowIndex)
                this.showModalEdit(record)
              },
            };
          }}
        />

        {/* <Table
          columns={columnsKelompok}
          dataSource={statusByKelompok}
        /> */}

        {/* <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {console.log(this.state.modalData)}
        </Modal> */}

        <WrappedFormPeserta
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          data={modalData}
        />
      </Content>
    );
  }
}

export default Index;
import React, { Component } from 'react';
import { Layout, Table, Input, Button, Icon } from 'antd';
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
      isEdituser: false
    }
  }

  componentDidMount() {
    this.getPesertaData();
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

  editPesertaData = (values) => {
    Api.put('peserta', values)
      .then(result => {
        console.log('resultPut', result);
        console.log('resultPutData', result.data);
        this.getPesertaData();
        this.setState({
          response: result,
          isAddUser: false,
          isEdituser: false
        })
      }).catch(err => console.log(err))
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      modalData: record,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.editPesertaData(values);
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
        textToHighlight={text.toString()}
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
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

    const { pesertaData, modalData } = this.state;
    // console.log('searchText', searchText)
    return (
      <Content style={{ padding: '0 50px', marginTop: 100 }}>
        <Button onClick={() => this.showModal()}>
          Tambah Peserta
        </Button>
        <Table
          columns={columns}
          dataSource={pesertaData}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {

                this.showModal(record)
              },
            };
          }}
        />

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
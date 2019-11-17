import React, { Component } from 'react';
import { Layout, List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Api from './../../../Api';
import Container from '../../../Components/Layout/Container/Container';

const { Content } = Layout;

class Index extends Component {
  constructor() {
    super()
    this.state = {
      pesertaData: [],
      loading: false,
      hasMore: true,
    }
  }

  componentDidMount() {
    this.getPesertaData();
  }

  getPesertaData = () => {
    Api.get('peserta')
      .then(({ data }) => {
        this.setState({
          pesertaData: data,
        })
      }).catch(err => console.log(err))
  }

  showModal = (e) => {
    console.log(e)
  }

  handleInfiniteLoad = () => {
    let { pesertaData } = this.state;
  
    this.setState({
      loading: true,
    })

    if (pesertaData.length > 10) {
      message.warning('Infinite List loaded all');
      this.setState({
          hasMore: false,
          loading: false,
        });
      return;
    }
    this.getPesertaData(data => {
      data = data.concat(data);
      this.setState({
        data,
        loading: false,
      })
    })
  }


  render() {
    const { pesertaData } = this.state;
    return (
      <Content>
        <Container>
          <div className="demo-infinite-container">
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={pesertaData}
                renderItem={item => (
                  <List.Item key={item.id_peserta}>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.nama_lengkap}</a>}
                      description={`ID Peserta: ${item.id_peserta} , ID Herbalife: ${item.id_herbalife}`}
                    />
                  </List.Item>
                )}
              >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
              </List>
            </InfiniteScroll>
          </div>
        </Container>
      </Content>
    );
  }
}

export default Index;
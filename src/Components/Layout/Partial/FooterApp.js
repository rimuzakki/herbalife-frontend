import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;


class FooterApp extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>2019</Footer>
    );
  }
}

export default FooterApp;
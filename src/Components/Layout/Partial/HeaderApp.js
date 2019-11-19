import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

class HeaderApp extends Component {
  render() {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >

          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>

          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default HeaderApp;
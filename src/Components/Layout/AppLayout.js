import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HeaderApp from './Partial/HeaderApp';
import FooterApp from './Partial/FooterApp';
import Homepage from '../../Modules/Homepage/Component/Index';
import TableStatus from '../../Modules/Homepage/Component/TableStatus';
// import City from '../../Modules/City/Component/City';
// import RestaurantDetail from '../../Modules/Restaurant/Component/RestaurantDetail';

class AppLayout extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <HeaderApp />
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/status" component={TableStatus}></Route>
          {/* <Route path="/restaurant/:restaurant_id" component={RestaurantDetail}></Route> */}
          {/* <Homepage /> */}
          <FooterApp />
        </Layout>
      </Router>
    );
  }
}

export default AppLayout;
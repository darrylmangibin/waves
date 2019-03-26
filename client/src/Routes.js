import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/Register';
import UserDashboard from './components/User/';
import Auth from './hoc/auth';
import Shop from './components/Shop';
import AddProduct from './components/User/Admin/Add_product';
import ManageCategories from './components/User/Admin/MangeCategories';
import ProductPage from './components/Product';
import UserCart from './components/User/Cart';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />

        <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />
         <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes;

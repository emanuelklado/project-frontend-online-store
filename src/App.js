import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { getCategories, getProductsFromCategoryAndQuery, getProductByProductId } from './services/api';
import Search from './components/Search';
import CartItems from './components/CartItems';
import ProductDetails from './components/ProductDetails';

export default class App extends Component {
  /* constructor() {
    super();

  } */

  componentDidMount() {

  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cart" component={ CartItems } />
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route exact path="/" component={ Search } />
        </Switch>
      </BrowserRouter>
    );
  }
}

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Search from './components/Search';
import CartItems from './components/CartItems';

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
          <Route exact path="/" component={ Search } />
        </Switch>
      </BrowserRouter>
    );
  }
}

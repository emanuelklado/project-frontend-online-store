import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { getCategories, getProductsFromCategoryAndQuery, getProductByProductId } from './services/api';
import Search from './components/Search';
import CartItems from './components/CartItems';
import ProductDetails from './components/ProductDetails';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      listCartSaved: [],
    };
  }

  componentDidMount() {

  }

  handleSetStateListCartSaved = (obj) => {
    const { listCartSaved } = this.state;
    this.setState({
      listCartSaved: [...listCartSaved, obj],
    });
  }

  render() {
    const { listCartSaved } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/cart"
            render={ () => (<CartItems
              listCartSaved={ listCartSaved }
            />) }
          />
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route
            exact
            path="/"
            render={ () => (<Search
              handleSetStateListCartSaved={ this.handleSetStateListCartSaved }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

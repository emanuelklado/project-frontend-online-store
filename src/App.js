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

  checkSaved = (obj) => {
    const { listCartSaved } = this.state;
    const alreadyExists = listCartSaved.find((item) => item.id === obj.id);
    if (alreadyExists) {
      const newQuantity = alreadyExists.quantity + 1;
      const isSaved = listCartSaved.map((item) => (item.id === obj.id
        ? { ...obj, quantity: newQuantity }
        : item));
      this.setState({
        listCartSaved: isSaved,
      });
    } else {
      this.setState({
        listCartSaved: [...listCartSaved, { ...obj, quantity: 1 }],
      });
    }
  }

  handleSetStateListCartSaved = (obj) => {
    this.checkSaved(obj);
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
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              handleSetStateListCartSaved={ this.handleSetStateListCartSaved }
            />) }
          />
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

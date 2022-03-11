import React, { Component } from 'react';
import './App.css';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

export default class App extends Component {
  /* constructor() {
    super();

  } */

  componentDidMount() {
    console.log(getCategories('Agro'));
    console.log(getProductsFromCategoryAndQuery('MLB1071', 'Animais'));
  }

  render() {
    return (
      <div>
        <h1>Projeto FrontEnd</h1>
      </div>
    );
  }
}

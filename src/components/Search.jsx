import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import CartImage from './CartImage';

class Search extends Component {
  // state = {  }

  render() {
    return (
      <div className="input-container">
        <label htmlFor="input-search" className="home-input-label">
          <input
            type="text"
            name="input-search"
            id="input-search"
            className="home-input"
          />
          <Link to="/cart" data-testid="shopping-cart-button" className="cart-img">
            <CartImage />
          </Link>
        </label>
        <h2
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import CartImage from './CartImage';
import * as api from '../services/api';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = async () => {
    const requestCategories = await api.getCategories();
    this.setState({
      categories: requestCategories,
    });
  }

  render() {
    const { categories, categorieNameSelected } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="input-search" className="home-input-label">
          <input
            type="text"
            name="input-search"
            id="input-search"
            className="home-input"
            onChange={ this.handleInput }
            value={ categorieNameSelected }
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

        <div className="categories-container">
          <section>
            <h2>Categorias</h2>
          </section>
          <aside className="buttons-container">
            {categories.map((cat) => (
              <button
                key={ cat.id }
                type="button"
                data-testid="category"
              >
                {cat.name}
              </button>
            ))}
          </aside>
        </div>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import CartImage from './CartImage';

import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchIt: '',
      productList: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = async () => {
    const requestCategories = await getCategories();
    this.setState({
      categories: requestCategories,
    });
  }

  inputC = ({ target: { name, value, type, checked } }) => {
    const valor = (type === 'checkbox')
      ? checked
      : value;
    this.setState({ [name]: valor }); // aula 11.2 1:48 de video
  }

  buttonClick = async () => {
    const { searchIt } = this.state;

    const result = await getProductsFromCategoryAndQuery('', searchIt);

    this.setState({
      // searchIt: '',
      productList: result.results,
    });
  }

  render() {
    const { searchIt, productList, categories } = this.state;
    console.log('lista,', productList);

    return (
      <div className="container-content">
        <label htmlFor="searchIt" className="home-input-label">
          <input
            data-testid="query-input"
            type="text"
            name="searchIt"
            id="input-search"
            className="home-input"
            onChange={ this.inputC }
            value={ searchIt }
            placeholder="Pesquisar produto"
            // value={ categorieNameSelected }
          />
          <button
            data-testid="query-button"
            type="submit"
            className="Button-Search"
            onClick={ this.buttonClick }
          >
            Pesquisar

          </button>
          <Link to="/cart" data-testid="shopping-cart-button" className="cart-img">
            <CartImage />
          </Link>
        </label>
        <h2
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>

        <div />

        <div>
          { productList.length !== 0
            ? (
              <p>
                {`Resultado de: ${searchIt}`}
              </p>)
            : <p>Nenhum produto foi encontrado</p>}
        </div>
        <div>
          { productList.map((element) => (
            <div
              className="container-card"
              data-testid="product"
              key={ element.id }
            >
              <div>
                <img src={ element.thumbnail } alt={ element.title } />
                <p>{ element.title }</p>
              </div>
            </div>
          ))}

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
      </div>
    );
  }
}

export default Search;

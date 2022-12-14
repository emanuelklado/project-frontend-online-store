import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import PropTypes from 'prop-types';
import CartImage from './CartImage';

import { getProductsFromCategoryAndQuery,
  getCategories,
  getProductByProductId } from '../services/api';

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

  handleCategory = async ({ target }) => {
    const query = target.textContent;
    const catResult = await getProductsFromCategoryAndQuery('', query);
    this.setState({
      productList: catResult.results,
      searchIt: query,
    });
  }

  handleAddToCart = async ({ target }) => {
    const productAdd = await getProductByProductId(target.id);
    /* console.log('add', productAdd); */
    const { handleSetStateListCartSaved } = this.props;
    // if (productAdd.quantity) {
    //   productAdd.quantity += 1;
    // } else {
    //   productAdd.quantity = 1;
    // }
    productAdd.isRendered = false;
    handleSetStateListCartSaved(productAdd);
  }

  render() {
    const { searchIt, productList, categories } = this.state;

    return (
      <div className="container-content">
        <section className="header-search">
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
              className=""
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
          <div>
            { productList.length !== 0
              ? (
                <p>
                  {`Resultado de: ${searchIt}`}
                </p>)
              : <p>Nenhum produto foi encontrado</p>}
          </div>
        </section>
        <section className="content">
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
                  onClick={ this.handleCategory }
                  className="btn btn-outline-secondary" // bootstrap
                >
                  {cat.name}
                </button>
              ))}
            </aside>
          </div>
          <div className="products">
            { productList.map((element) => (
              <div
                className="container-card"
                data-testid="product"
                key={ element.id }
              >
                <div className="card-product">
                  <Link to={ `/product/${element.id}` } data-testid="product-detail-link">
                    <img src={ element.thumbnail } alt={ element.title } />
                    <p>{ element.title }</p>
                    <p>{`Pre??o: R$ ${element.price}`}</p>

                  </Link>
                  <div>
                    <button
                      id={ element.id }
                      type="button"
                      onClick={ this.handleAddToCart }
                      data-testid="product-add-to-cart"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  handleSetStateListCartSaved: PropTypes.func.isRequired,
};

export default Search;

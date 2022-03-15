import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import goBackSymbol from '../images/goback-symbol.png';
import './ProductDetails.css';
import { getProductByProductId } from '../services/api';
import CartImage from './CartImage';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productImgUrl: '',
      priceValue: 0,
      mercadoPagoBool: false,
      productBrand: '',
      productCondition: '',
    };
  }

  componentDidMount() {
    this.findProductInfo();
    this.productSetState();
  }

  handleAddToCart = async () => {
    const productAdd = await this.findProductInfo();

    const { handleSetStateListCartSaved } = this.props;
    handleSetStateListCartSaved(productAdd);
  }

  getBack = () => {
    const { history } = this.props;
    const lastPage = -1;
    return history.go(lastPage);
  }

  findProductInfo = async () => {
    const { match: { params } } = this.props;
    const { id } = params;
    const product = await getProductByProductId(id);
    console.log('produto ', product);
    console.log(params);
    return product;
  }

  getCondition = (condition) => {
    switch (condition) {
    case 'new':
      return 'Novo';
    case 'used':
      return 'Usado';
    default:
      return 'Não Especificada';
    }
  }

  productSetState = async () => {
    const productObj = await this.findProductInfo();
    const { accepts_mercadopago: acceptsMercadoPago, attributes, condition, price,
      thumbnail, title } = productObj;
    const brandNameFind = attributes.find((item) => item.id.includes('BRAND'));
    const brandName = (brandNameFind ? brandNameFind.value_name : 'Não Informada');
    const translatedCondition = this.getCondition(condition);
    this.setState({
      productName: title,
      productImgUrl: thumbnail,
      priceValue: price,
      mercadoPagoBool: acceptsMercadoPago,
      productBrand: brandName,
      productCondition: translatedCondition,
    });
  }

  render() {
    const { productName, productImgUrl, priceValue,
      mercadoPagoBool, productBrand, productCondition } = this.state;
    return (
      <div>
        <div className="favicons-container">
          <div
            onClick={ this.getBack }
            onKeyDown={ () => {} }
            role="button"
            tabIndex="0"
            className="goback-symbol"
          >
            <img src={ goBackSymbol } alt="goback" />
          </div>
          <div className="cart-image-details">
            <Link to="/cart" data-testid="shopping-cart-button" className="cart-img">
              <CartImage />
            </Link>
          </div>
        </div>
        <h3 className="product-title" data-testid="product-detail-name">
          {`${productName} `}
        </h3>
        <h3 className="product-title">
          Preço: R$
          {' '}
          {priceValue}
        </h3>
        <div className="specs-container">
          <img src={ productImgUrl } alt={ `Foto de: ${productName}` } />
          <div className="specs-list">
            <ul>
              <h4>Especificações</h4>
              <li>
                Marca:
                {` ${productBrand}`}
              </li>
              <li>
                Condição:
                { ` ${productCondition}`}
              </li>
              <li>
                Aceita Mercado Pago?
                {mercadoPagoBool ? ' Sim' : ' Não'}
              </li>
            </ul>
          </div>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.handleAddToCart }
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  handleSetStateListCartSaved: PropTypes.func.isRequired,
};

ProductDetails.defaultProps = {
  match: {},
  history: {},
};

export default ProductDetails;

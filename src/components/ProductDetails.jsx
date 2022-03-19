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
      emailInput: '',
      textAreaInput: '',
      radioInput: 0,
      storagedEvaluations: [],
    };
  }

  componentDidMount() {
    this.findProductInfo();
    this.productSetState();
    this.getEvaluation();
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
    return product;
  }

  getCondition = (condition) => {
    const conditionObj = {new: 'Novo', used: 'Usado'}
    return conditionObj[condition] || 'Não especificado';
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

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value, // o name recebe o value name="value" pq tem o []
    });
  }

  submitEvaluation = () => {
    const { emailInput, textAreaInput, radioInput } = this.state;
    const stateObj = {
      emailInput,
      textAreaInput,
      radioInput,
    };
    const saved = JSON.parse(localStorage.getItem('teste'));
    if (saved) {
      localStorage.setItem('teste', JSON.stringify([...saved, stateObj]));
    } else {
      localStorage.setItem('teste', JSON.stringify([stateObj]));
    }
    this.setState({
      emailInput: '',
      textAreaInput: '',
      radioInput: 0,
    })
    this.getEvaluation();
  }

  getEvaluation = () => {
    const storagedEvaluations = JSON.parse(localStorage.getItem('teste'));
    this.setState({
      storagedEvaluations,
    });
  }

  render() {
    const { productName, productImgUrl, priceValue,
      mercadoPagoBool, productBrand, productCondition,
      textAreaInput, emailInput, storagedEvaluations } = this.state;
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
        <h3> Avalie o produto </h3>
        <form>
          <div className="form-container-inside">
            <input
              data-testid="product-detail-email"
              type="text"
              name="emailInput"
              placeholder="Email"
              className="form-input-email"
              onChange={ this.onInputChange }
              value={ emailInput }
            />
            <label htmlFor="r-star">
            {
              [1,2,3,4,5].map((item) => (
                <input
                data-testid={`${item}-rating`}
                type="radio"
                name="radioInput"
                value={item}
                onChange={ this.onInputChange }
              />
              ))
            }
            </label>
          </div>
          <hr />
          <textarea
            data-testid="product-detail-evaluation"
            type="text"
            name="textAreaInput"
            className="text-area"
            placeholder="Mensagem (opcional)"
            value={ textAreaInput }
            onChange={ this.onInputChange }
          />
          <div>
            <button
              data-testid="submit-review-btn"
              type="button"
              id="btn-form-av"
              onClick={ this.submitEvaluation }
            >
              Enviar
            </button>
          </div>
        </form>
        <div>
          <h3> Avaliações </h3>
          {
            storagedEvaluations?.map((item, index) => (
              <div key={ `item.emailInput${index}` }>
                <h4>
                  {item.emailInput}
                </h4>
                <p>{item.textAreaInput}</p>
                <p>
                  {item.radioInput}
                </p>
              </div>
            ))
          }
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

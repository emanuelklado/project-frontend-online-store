import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import goBackSymbol from '../images/goback-symbol.png';
import CartImage from './CartImage';
import emptyCartImg from '../images/empty-shipping-box-removebg-preview.png';
import './CartItems.css';

class CartItems extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  getCounter = (element, array) => {
    const filtred = array.filter((param) => param.id === element.id);
    const counter = filtred.length;
    return counter;
  }

  // getRendered = (element) => {

  // }

  /* getBack = () => {
    const { history, value } = this.props;
    const lastPage = -1;
    if (value) {
      return value.history.go(lastPage);
    }
    return history.go(lastPage);
  } */
  componentDidMount() {
    this.getDisabled();
  }

  handleTest = ({ target }) => {
    const { id } = target;
    const { handleSubButton } = this.props;
    handleSubButton(id);
    this.checkDisabled(id);
  }

  handleTest2 = ({ target }) => {
    const { id } = target;
    const { handleAddButton } = this.props;
    handleAddButton(id);
    this.checkDisabled(id);
  }

  getDisabled = () => {
    const { listCartSaved } = this.props;
    listCartSaved.forEach((item) => {
      this.setState({
        [`isDisabled${item.id}`]: false,
      });
    });
  }

  checkDisabled = (id) => {
    const { listCartSaved } = this.props;
    const obj = listCartSaved.find((item) => item.id === id);
    const { quantity } = obj;
    const boolQuantity = quantity === 0;
    this.setState({
      [`isDisabled${id}`]: boolQuantity,
    });
  }

  render() {
    const { listCartSaved, handleAddButton, handleSubButton } = this.props;
    const { state } = this;
    return (
      <>
        <div>
          <Link exact to="/">
            <img src={ goBackSymbol } alt="goback" className="goback-symbol" />
          </Link>
          <div className="cart-image-container">
            <CartImage />
            <p>Carrinho de Compras</p>
          </div>
        </div>
        <div>
          { listCartSaved.length > 0
            ? listCartSaved.map((item, index) => (
              <div key={ index }>
                <p data-testid="shopping-cart-product-name">{item.title}</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>
                  Preço:
                  {' '}
                  {item.price}
                </p>
                <div>
                  Quantidade:
                  <p data-testid="shopping-cart-product-quantity">
                    {item.quantity}
                  </p>

                  <button
                    type="button"
                    name="decrease"
                    data-testid="product-decrease-quantity"
                    id={ item.id }
                    disabled={ state[`isDisabled${item.id}`] }
                    onClick={ this.handleTest }
                    // /handleSubButton={ handleSubButton }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    name="add"
                    data-testid="product-increase-quantity"
                    id={ item.id }
                    onClick={ this.handleTest2 }

                  >
                    +
                  </button>

                </div>
              </div>
            ))
            : (
              <div className="empty-cart">
                <img
                  src={ emptyCartImg }
                  alt="Carrinho vazio"
                  className="empty-cart-img"
                />
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              </div>)}
        </div>

      </>
    );
  }
}

CartItems.propTypes = {
  /* history: PropTypes.objectOf(PropTypes.any), */
  listCartSaved: PropTypes.string.isRequired,
};

CartItems.defaultProps = {
  /* history: {}, */
};
export default CartItems;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import goBackSymbol from '../images/goback-symbol.png';
import CartImage from './CartImage';
import emptyCartImg from '../images/empty-shipping-box-removebg-preview.png';
import './CartItems.css';

class CartItems extends Component {
  state = { }

  getBack = () => {
    const { history } = this.props;
    const lastPage = -1;
    return history.go(lastPage);
  }

  render() {
    return (
      <>
        <div>
          <div
            onClick={ this.getBack }
            onKeyDown={ () => {} }
            role="button"
            tabIndex="0"
            className="goback-symbol"
          >
            <img src={ goBackSymbol } alt="goback" />
          </div>
          <div className="cart-image-container">
            <CartImage />
            <p>Carrinho de Compras</p>
          </div>
        </div>
        <div className="empty-cart">
          <img src={ emptyCartImg } alt="Carrinho vazio" className="empty-cart-img" />
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      </>
    );
  }
}

CartItems.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

CartItems.defaultProps = {
  history: {},
};
export default CartItems;

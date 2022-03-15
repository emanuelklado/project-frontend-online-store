import React, { Component } from 'react';
import PropTypes from 'prop-types';
import goBackSymbol from '../images/goback-symbol.png';
import CartImage from './CartImage';
import emptyCartImg from '../images/empty-shipping-box-removebg-preview.png';
import './CartItems.css';

class CartItems extends Component {
  // constructor() {
  //   super();
  //   this.state = {

  //   };
  // }

  getCounter = (element, array) => {
    const filtred = array.filter((param) => param.id === element.id);
    const counter = filtred.length;
    return counter;
  }

  // getRendered = (element) => {

  // }

  getBack = () => {
    const { history } = this.props;
    const lastPage = -1;
    return history.go(lastPage);
  }

  render() {
    const { listCartSaved } = this.props;
    console.log(listCartSaved);
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
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  {/* {item.quantity} */}
                  {this.getCounter(item, listCartSaved)}
                </p>
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
  history: PropTypes.objectOf(PropTypes.any),
  listCartSaved: PropTypes.string.isRequired,
};

CartItems.defaultProps = {
  history: {},
};
export default CartItems;

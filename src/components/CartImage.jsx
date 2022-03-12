import React, { Component } from 'react';
import shoppingCart from '../images/carticon.png';

class CartImage extends Component {
  state = { }

  render() {
    return (
      <img src={ shoppingCart } alt="Carrinho de compras" />
    );
  }
}

export default CartImage;

import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { isNull } from '../lib/utils';
import { Link } from 'react-router-dom';

const CartItemsList = () => {

  const { cartItems } = useSelector(state => state.cart);

  const CanOrder = !isNull(cartItems);

  return (
    <>
      {CanOrder && (
        cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })
      ) || (
          <Link to='/shop' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
            Start Shopping
          </Link>
        )}
    </>
  )
}

export default CartItemsList
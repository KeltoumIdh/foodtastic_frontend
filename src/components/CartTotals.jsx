import React from 'react'
import { useSelector } from 'react-redux';
import { isNull } from '../lib/utils';

const CartTotals = ({ setFinalPrice }) => {

  const { cartItems } = useSelector(state => state.cart);

  const CanOrder = !isNull(cartItems);

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + parseFloat(product.price) * product.quantity;
    }, 0).toFixed(2);
  };
  
  const totalPrice = parseFloat(calculateTotalPrice(cartItems));
  const tax = totalPrice * 20 / 100;
  const shipping = CanOrder ? 50 : 0;
  const finalTotalPrice = Math.round(totalPrice + shipping + tax);

  setFinalPrice(finalTotalPrice)

  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Subtotal</span>
          <span className='font-medium'>${totalPrice.toFixed(2)}</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Shipping</span>
          <span className='font-medium'>${shipping.toFixed(2)}</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Tax 20%</span>
          <span className='font-medium'>${tax.toFixed(2)}</span>
        </p>
        {/* Order Total */}
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Order Total</span>
          <span className='font-medium'>${finalTotalPrice}</span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals
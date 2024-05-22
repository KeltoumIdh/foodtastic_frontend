import { useDispatch } from "react-redux";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";


const CartItem = ({ cartItem = {} }) => {
  const { id, name, price, image, quantity } = cartItem;

  const dispatch = useDispatch();

  return (
    <article
      key={id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image ?? ''}
        alt={name}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover bg-gray-100"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium text-accent-content">{name}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-accent-content">
          price: {price}
        </h4>
        <h4 className="mt-2 capitalize text-sm text-accent-content">
          quantity: {quantity}
        </h4>
        <button
          className="mt-2 link link-warning link-hover text-sm text-red-400 hover:underline"
          onClick={() => dispatch(removeItem(id))}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto text-accent-content">${price * quantity}</p>
    </article>
  );
};

export default CartItem;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  decrementQuantity,
} from "../../reducers/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDecrementQuantity = (itemId) => {
    dispatch(decrementQuantity({ id: itemId }));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalSavings = () => {
    return cart.reduce(
      (savings, item) =>
        savings + item.price * item.discount * item.quantity * 0.01,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-2xl font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mt-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2 border border-gray-300 rounded-md p-4 my-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md mr-2"
                  />
                  <span>{item.name}</span>
                </div>
                <span className="flex items-center">
                  <button
                    onClick={() => handleDecrementQuantity(item.id)}
                    className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <div>
              <p className="font-bold">{`Total Price: ₹ ${getTotalPrice()}`}</p>
              <p className="text-green-600">{`You Saved: ₹ ${getTotalSavings().toFixed(
                2
              )}`}</p>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded mt-4"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// const handleDecrementQuantity = (itemId) => {
//   dispatch(removeFromCart({ id: itemId, type: "decrement" }));
// };

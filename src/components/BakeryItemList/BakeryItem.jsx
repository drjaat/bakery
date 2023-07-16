import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decrementQuantity,
} from "../../reducers/cartSlice";

const BakeryItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncrement = () => {
    dispatch(addToCart(item));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ id: item.id }));
  };

  // Calculate the discount price
  const discountPrice = Math.floor(
    item.price - (item.price * item.discount) / 100
  );

  return (
    <div className="overflow-hidden border border-gray-300 rounded-md pt-0 transition transform hover:scale-105 hover:shadow-lg">
      <img
        src={item.image}
        alt={item.name}
        className="object-cover rounded-md w-full"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mt-2">{item.name}</h3>
        <p className="mt-1">{item.description}</p>
        <span className="font-bold mt-1">
          {item.discount > 0 ? (
            <span>
              ₹ {discountPrice}
              <del className="text-gray-500 ml-2">₹ {item.price}</del>{" "}
              <span className="text-green-500 font-medium">
                ({item.discount}% off)
              </span>
            </span>
          ) : (
            `₹ ${item.price}`
          )}
        </span>
        <div className="mt-2">
          {cartItem ? (
            <div className="flex items-center">
              <button
                onClick={handleDecrement}
                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
              >
                -
              </button>
              <span className="px-3 py-1">{cartItem.quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={handleRemoveFromCart}
                className="bg-red-500 hover:bg-red-400 text-white ml-2 px-3 py-1 rounded"
              >
                Remove from Cart
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded mt-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BakeryItem;

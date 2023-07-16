import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const navigate = useNavigate();

  const handleViewCart = () => {
    toggleCart();
    navigate("/cart"); // Redirect to the cart page
  };

  const cartIsEmpty = cart.length === 0;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Bakery Shop
          </Link>
          {!cartIsEmpty && (
            <div className="relative">
              <button
                onClick={toggleCart}
                className="flex text-gray-600 hover:text-gray-800"
              >
                <MdShoppingCart size={24} /> ({cart.length})
              </button>
              <div
                className={`${
                  showCart ? "block" : "hidden"
                } absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10`}
              >
                {cart.length > 0 ? (
                  <div className="py-2 px-4">
                    <h3 className="text-lg font-bold mb-2">Cart</h3>
                    <TransitionGroup>
                      {cart.map((item) => (
                        <CSSTransition
                          key={item.id}
                          classNames="fade"
                          timeout={300}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded-md mr-2"
                            />
                            <span>{item.name}</span>
                            <span>{`x${item.quantity}`}</span>
                          </div>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleViewCart}
                        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 px-4">
                    <p className="text-gray-600">Your cart is empty.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="hidden md:flex space-x-4">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-gray-800 font-medium transition duration-300"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items from local storage or API
    const fetchCartItems = () => {
      // try {
      //     const items = localStorage.getItem('cart')
      //         ? JSON.parse(localStorage.getItem('cart'))
      //         : [];
      //     setCartItems(items);
      //     calculateTotal(items);
      // } catch (error) {
      //     console.error("Error loading cart:", error);
      // } finally {
      //     setIsLoading(false);
      // }

      fetch("/dummyData/dummyCart.json")
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data);
          calculateTotal(data);
        })
        .catch((error) => console.error("Error loading cart:", error))
        .finally(() => setIsLoading(false));
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (isLoading) {
    return <div className='container mx-auto p-4'>Loading cart...</div>;
  }

  // Empty cart button
  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto p-4 text-center'>
        <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
        <p className='mb-4'>Your cart is empty</p>
        <Link
          href='/products'
          className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors'
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Main cart buttons
  return (
    <div className="min-h-screen mt-10 bg-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Material Cart</h2>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <h3 className="text-base font-semibold text-gray-800">Items ({cartItems.length})</h3>
                  <h3 className="text-base font-semibold text-gray-800">Price</h3>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-grow flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-medium text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-base font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:border-l border-gray-100 p-5 bg-gray-50">
              <div className="sticky top-6">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-grow px-3 py-2 rounded-l-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Apply
                    </button>
                  </div>

                  <div className="space-y-2 pt-4 border-t text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>IGST (18%)</span>
                      <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-4 border-t">
                      <span>Total</span>
                      <span>₹{(totalPrice * 1.23).toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full text-center bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors mt-8"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

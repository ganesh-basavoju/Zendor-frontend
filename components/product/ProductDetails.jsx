"use client";

import { FaWhatsapp, FaSquareXTwitter } from "react-icons/fa6";
import FeatureItem from "./FeatureItem";
import { useEffect, useState } from "react";

const ProductDetails = ({ 
  product, 
  priceDetails, 
  dimensions,
  selectedSize,
  setSelectedSize,
  selectedTexture,
  setSelectedTexture,
  selectedImage,
  setSelectedImage,
  handleDimensionChange,
  decrementProductQuantity,
  incrementProductQuantity,
  handleProductToCart,
  setTypeToggle,
  typeToggle,
  selectedWall,
  setSelectedWall,
  wallDimensions = {} // Add default value
}) => {
  const handleWhatsAppOrder = () => {
    const wallsMessage = Object.entries(wallDimensions)
      .filter(([_, dims]) => dims.width > 0 && dims.height > 0)
      .map(([wall, dims]) => `${wall}: ${dims.width} × ${dims.height} ${typeToggle ? "in" : "ft"}`)
      .join('\n');

    const message = `Hi, I'm interested in ordering:\n\n` +
      `Product: ${product.name}\n` +
      `Size: ${selectedSize}\n` +
      `Texture: ${selectedTexture}\n` +
      `Quantity: ${product.quantity}\n` +
      `Walls:\n${wallsMessage}\n` +
      `Total Price: ₹${priceDetails.totalPrice}`;

    const whatsappUrl = `https://wa.me/918433900692?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const [selectedType, setSelectedType] = useState('inches');
  const walls = ['Wall A', 'Wall B', 'Wall C', 'Wall D'];

  // Update initialization useEffect
  useEffect(() => {
    if (!selectedWall) {
      setSelectedWall('Wall A');
    }
  }, []);

  // Add safety check for wallDimensions
  const currentWallDimensions = wallDimensions[selectedWall] || { width: '', height: '' };

  const handleToggle = (e) => {
    if(e.target.name === "inches"){
      setTypeToggle(true)
    }
    else{
      setTypeToggle(false)
    }

  }
useEffect(()=>{
  if(selectedType === "inches"){
    setTypeToggle(true);
  }else{
    setTypeToggle(false);
  }
},[selectedType]);
  return (
    <div className="lg:col-span-5 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-2xl font-medium mt-2">₹{priceDetails.totalPrice}</p>
      </div>

      {/* Wall Selection - Add this new section */}
      

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Size</label>
        <div className="flex gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded ${
                selectedSize === size ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`.trim()}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Texture Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Paper Texture</label>
        <div className="flex flex-wrap gap-3">
          {product.textures.map((texture) => (
            <button
              key={texture.name}
              className={`px-4 py-2 border rounded ${
                selectedTexture === texture.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`.trim()}
              onClick={() => setSelectedTexture(texture.name)}
            >
              <span className="block">{texture.name}</span>
              <span className="block text-sm text-gray-500">₹{texture.basePrice}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Colour</label>
        <div className="flex flex-wrap gap-4">
          {[
            { name: 'Sky Blue', value: '#CBD5E1', imageIndex: 0 },
            { name: 'Charcoal', value: '#4B5563', imageIndex: 1 },
            { name: 'Blush', value: '#F5B7B1', imageIndex: 2 },
            { name: 'Taupe', value: '#B8A99A', imageIndex: 3 }
          ].map((color, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-full border-2 transition-transform ${
                selectedImage === color.imageIndex 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-200 hover:scale-110'
              }`.trim()}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedImage(color.imageIndex)}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Dimensions Input */}
      {selectedSize === 'Custom Roll Size' && (
        <div className="space-y-6 p-6 bg-gray-50/50 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">{selectedWall} Dimensions</h3>
            <div className="flex items-center bg-white rounded-lg shadow-sm">
              <button
                name="inches"
                onClick={handleToggle}
                className={`px-4 py-2 rounded-lg transition-all ${
                  typeToggle ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Inches
              </button>
              <button
                name="feets"
                onClick={handleToggle}
                className={`px-4 py-2 rounded-lg transition-all ${
                  !typeToggle ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Feet
              </button>
            </div>
          </div>

          {/* // First, add this section right after the wall selection buttons */}
          {selectedSize === 'Custom Roll Size' && (
            <div className="mt-4">
              {Object.entries(wallDimensions)
                .filter(([wall, dims]) => dims.width > 0 || dims.height > 0)
                .map(([wall, dims]) => (
                  <div key={wall} className="text-sm text-gray-600 mb-2">
                    {wall}: {dims.width}×{dims.height} {typeToggle ? "inches" : "feet"}({dims.area || 0} sq.ft) - ₹{(dims.area * priceDetails.basePrice).toFixed(2)}
                  </div>
                ))
              }
              <div className="text-sm font-medium mt-2">
                Total Area: {Object.values(wallDimensions).reduce((sum, wall) => sum + (wall.area || 0), 0)} sq.ft
              </div>
            </div>
          )}

          {/* Update the input fields to use wallDimensions */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Width ({typeToggle ? "in" : "ft"})
              </label>
              <input
                type="number"
                value={dimensions.width || ''}
                onChange={(e) => handleDimensionChange(e, 'width')}
                className="w-full px-4 py-2.5 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="0"
                placeholder="Enter width"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Height ({typeToggle ? "in" : "ft"})
              </label>
              <input
                type="number"
                value={dimensions.height || ''}
                onChange={(e) => handleDimensionChange(e, 'height')}
                className="w-full px-4 py-2.5 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="0"
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Area</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-gray-900">{dimensions?.area || 0}</span>
                  <span className="text-sm text-gray-500">sq.ft</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="block text-sm text-gray-500 mb-1">Wastage Factor</span>
                <span className="text-lg font-medium text-gray-900">{dimensions?.wastageArea || 0} sq.ft</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="block text-sm text-gray-500 mb-1">No. of cartons</span>
                <span className="text-lg font-medium text-gray-900">{dimensions?.cartonsNeeded || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-700">Measure your room accurately for precise calculations</p>
          </div>
        </div>
      )}
      {selectedSize === 'Custom Roll Size' && (
        <div>
          <label className="block text-sm font-medium mb-2">Select Wall</label>
          <div className="flex flex-wrap gap-3">
            {walls.map((wall) => (
              <button
                key={wall}
                onClick={() => setSelectedWall(wall)}
                className={`px-4 py-2 border rounded ${
                  selectedWall === wall 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`.trim()}
              >
                {wall}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Quantity:</span>
        <div className="flex border rounded">
          <button
            onClick={decrementProductQuantity}
            className="px-4 py-2 border-r hover:bg-gray-50 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-6 py-2">{product.quantity}</span>
          <button
            onClick={incrementProductQuantity}
            className="px-4 py-2 border-l hover:bg-gray-50 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleProductToCart}
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
        <button className="w-full py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
          Buy Now
        </button>
      </div>

      {/* Description */}
      <div className="pt-6 border-t">
        <h2 className="text-lg font-medium mb-3">Description</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Features */}
      <div className="pt-6 border-t">
        <h2 className="text-lg font-medium mb-3">Features</h2>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </ul>
      </div>

      {/* Share buttons section */}
      <div className="pt-6 border-t">
        <h3 className="text-gray-600 mb-4">Have a question? We are here to help :)</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleWhatsAppOrder}
            className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <FaWhatsapp className="text-xl" />
            Order on WhatsApp
          </button>
          <a
            href="tel:+91-81215-23945"
            className="flex-1 py-3 px-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 = 3.24 3 = 3.99 3 = 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
            +91-81215 23945
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
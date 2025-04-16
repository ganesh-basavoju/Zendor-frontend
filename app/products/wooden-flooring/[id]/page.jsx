"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaToggleOff } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";

export default function WoodenFlooringProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Custom Roll Size');
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    area: 0
  });
  const [unit, setUnit] = useState('inches');
  const [price, setPrice] = useState({
    basePrice: 999.99,
    total: 999.99
  });

  const [selectedWalls, setSelectedWalls] = useState(['A']);
  const [activeWall, setActiveWall] = useState('A');
  // Update wallDimensions state to include price
  const [wallDimensions, setWallDimensions] = useState({
    A: { width: 0, height: 0, area: 0, price: 0 },
    B: { width: 0, height: 0, area: 0, price: 0 },
    C: { width: 0, height: 0, area: 0, price: 0 },
    D: { width: 0, height: 0, area: 0, price: 0 }
  });
  
  // Update useEffect for price calculations
  useEffect(() => {
    if (dimensions.width > 0 || dimensions.height > 0) {
      let width = dimensions.width;
      let height = dimensions.height;
      
      if (unit === 'inches') {
        width = width / 12;
        height = height / 12;
      }
      
      const area = width * height;
      const areaWithWaste = area + (area * 0.10);
      const basePrice = 999.99;
      const wallPrice = basePrice * Math.ceil(areaWithWaste);
      setDimensions(prev => ({ ...prev, area: Math.ceil(areaWithWaste) }));

      setWallDimensions(prev => ({
        ...prev,
        [activeWall]: {
          width: dimensions.width,
          height: dimensions.height,
          area: Math.ceil(areaWithWaste),
          price: wallPrice
        }
      }));
    }
  }, [dimensions.width, dimensions.height, unit, activeWall]);

  // Add new useEffect for total price calculation
  useEffect(() => {
    const totalWallsPrice = Object.entries(wallDimensions)
      .filter(([wall]) => selectedWalls.includes(wall))
      .reduce((sum, [_, dims]) => sum + dims.price, 0);
    
    setPrice({ 
      basePrice: 999.99, 
      total: selectedSize === 'Sample' ? 999.99 : totalWallsPrice 
    });
  }, [wallDimensions, selectedWalls, selectedSize]);

  // Update the price display in Product Details section
  <div>
    <h1 className="text-3xl font-semibold text-gray-900">Premium Wooden Flooring</h1>
    <p className="text-2xl font-medium text-gray-900 mt-4">
      ₹{selectedSize === 'Sample' ? price.basePrice : price.total.toFixed(2)}
    </p>
    {selectedWalls.length > 1 && selectedSize !== 'Sample' && (
      <p className="text-md text-gray-600 mt-2">
        Total price for {selectedWalls.length} walls
      </p>
    )}
  </div>
  const handleWallSelection = (wall) => {
    if (wall === 'A') return; // Wall A cannot be deselected
    
    setSelectedWalls(prev => {
      if (prev.includes(wall)) {
        return prev.filter(w => w !== wall);
      }
      return [...prev, wall];
    });
    setActiveWall(wall);
    
    // Reset dimensions when switching walls
    setDimensions({
      width: wallDimensions[wall].width,
      height: wallDimensions[wall].height,
      area: wallDimensions[wall].area
    });
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src="https://www.bohomaterials.com/web/image/product.product/16/image_1024/Walnut%20Dark?unique=f7b911a"
            alt="Premium Wooden Flooring"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Premium Wooden Flooring</h1>
            <p className="text-2xl font-medium text-gray-900 mt-4">
              ₹{selectedSize === 'Sample' ? price.total : `${price.total.toFixed(2)}`}
            </p>
            
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Size</p>
            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                  selectedSize === 'Custom Roll Size' 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSize('Custom Roll Size')}
              >
                Custom Roll Size
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                  selectedSize === 'Sample' 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSize('Sample')}
              >
                Sample
              </button>
            </div>
          </div>

          {/* Dimensions Section - Only show when Custom Roll Size is selected */}
          {selectedSize === 'Custom Roll Size' && (
            <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Select type</label>
                  <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => setUnit('inches')}
                      className={`px-4 py-2 rounded-lg transition-all ${unit === 'inches' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => setUnit('feet')}
                      className={`px-4 py-2 rounded-lg transition-all ${unit === 'feet' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Feet
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width ({unit})</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={dimensions.width}
                    onChange={(e) => {
                      setDimensions(prev => ({...prev, width: parseFloat(e.target.value) || 0}));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={dimensions.height}
                    onChange={(e) => {
                      setDimensions(prev => ({...prev, height: parseFloat(e.target.value) || 0}));
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.ft)</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
                  value={dimensions.area}
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-2">Total area: Width × Height</p>
                <p  className="text-md text-gray-500 mt-2 "> No.of cartons: {Math.ceil(dimensions.area/18.36)}</p>
                <p  className="text-md text-gray-500 mt-2 "> No.of  skirting pieces: {Math.ceil(2*(dimensions.width+dimensions.height))}</p>
              </div>
            </div>
          )}



          {/* Replace Quantity Section with Wall Selection */}
          {selectedSize === 'Custom Roll Size' && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Select Wall</span>
              <div className="flex gap-3">
                {['A', 'B', 'C', 'D'].map((wall) => (
                  <button
                    key={wall}
                    onClick={() => handleWallSelection(wall)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedWalls.includes(wall)
                        ? wall === activeWall
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-green-600 bg-green-50 text-green-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Wall {wall}
                  </button>
                ))}
              </div>
              {/* Display selected wall dimensions */}
              <div className="mt-4 space-y-2">
                {selectedWalls.map(wall => (
                  <div key={wall} className="text-sm text-gray-600">
                    Wall {wall}: {wallDimensions[wall].width}x{wallDimensions[wall].height} {unit} 
                    ({wallDimensions[wall].area} sq.ft) - ₹{wallDimensions[wall].price.toFixed(2)}
                  </div>
                ))}
                {selectedWalls.length > 1 && (
                  <div className="text-sm font-medium text-gray-700 mt-2">
                    Total Area: {Object.entries(wallDimensions)
                      .filter(([wall]) => selectedWalls.includes(wall))
                      .reduce((sum, [_, dims]) => sum + dims.area, 0)} sq.ft
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Specifications */}
          <div className="pt-8 border-t">
            <h2 className="text-xl font-semibold mb-6">Specifications</h2>
            <div className="grid gap-4">
              {[
                { label: 'Brand', value: 'Kaara' },
                { label: 'Size', value: '1900 x 190' },
                { label: 'Approx Thickness', value: '14 mm' },
                { label: 'Core', value: 'Pine' },
                { label: 'Finish', value: 'Matt Lacquer, Brushed' },
                { label: 'Shade', value: 'Dark' },
                { label: 'Per Box coverage (Sqft)', value: 'NA' },
              ].map((spec, index) => (
                <div key={index} className="flex py-3 border-b border-gray-100">
                  <span className="w-1/2 text-gray-600">{spec.label}</span>
                  <span className="w-1/2 font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="pt-8">
            <p className="text-gray-600 mb-4">Have a question? We are here to help :)</p>
            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Order on WhatsApp
              </button>
              <button className="flex-1 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                +91-81215 22945
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Related products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            name: 'Oak Natural',
            image: "https://www.bohomaterials.com/web/image/product.product/16/image_1024/Walnut%20Dark?unique=f7b911a",
            colors: ['brown', 'natural']
          },
          {
            id: 2,
            name: 'Maple Light',
            image: "https://www.bohomaterials.com/web/image/product.product/17/image_1024/Oak%20Natural?unique=f7b911b",
            colors: ['beige', 'light']
          },
          {
            id: 3,
            name: 'Walnut Dark',
            image: "https://www.bohomaterials.com/web/image/product.product/25/image_1024/Oak%20Light%20(C)?unique=61464e9",
            colors: ['dark brown', 'black']
          },
        ].map((relatedProduct) => (
          <div key={relatedProduct.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={relatedProduct.image}
                alt={relatedProduct.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{relatedProduct.name}</h3>
              <div className="flex gap-2 mt-2">
                {relatedProduct.colors.map((color, index) => (
                  <span key={index} className="text-sm text-gray-500">{color}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
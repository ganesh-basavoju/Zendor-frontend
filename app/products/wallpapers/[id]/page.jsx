"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



export default function WoodenFlooringProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Custom Roll Size');
  // Add the missing texture state
  const [selectedTexture, setSelectedTexture] = useState('Feather');
  
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

  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
    "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
  ];

  // Add texture options
  const textures = [
    { name: 'Feather', price: 99.99 },
    { name: 'Canvas', price: 149.99 },
    { name: 'Leather', price: 199.99 },
    { name: 'Silk', price: 179.99 },
  ];
  
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
      const selectedTextureData = textures.find(t => t.name === selectedTexture);
      const basePrice = selectedTextureData ? selectedTextureData.price : 999.99;
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
  }, [dimensions.width, dimensions.height, unit, activeWall, selectedTexture]);

  // Update useEffect for total price calculation
  useEffect(() => {
    const selectedTextureData = textures.find(t => t.name === selectedTexture);
    const basePrice = selectedTextureData ? selectedTextureData.price : 999.99;
    
    const totalWallsPrice = Object.entries(wallDimensions)
      .filter(([wall]) => selectedWalls.includes(wall))
      .reduce((sum, [_, dims]) => sum + dims.price, 0);
    
    setPrice({ 
      basePrice: basePrice, 
      total: selectedSize === 'Sample' ? basePrice : totalWallsPrice 
    });
  }, [wallDimensions, selectedWalls, selectedSize, selectedTexture]);

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


  // Add color options
  const colors = [
    { name: 'Sky Blue', value: '#CBD5E1', imageIndex: 0 },
    { name: 'Charcoal', value: '#4B5563', imageIndex: 1 },
    { name: 'Blush', value: '#F5B7B1', imageIndex: 2 },
    { name: 'Taupe', value: '#B8A99A', imageIndex: 3 }
  ];

  // Update the Product Image section
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <div className="relative h-[600px] bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt="Product Image"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Premium Wooden Flooring</h1>
            <p className="text-2xl font-medium text-gray-900 mt-4">
              ₹{selectedSize === 'Sample' ? price.total : `${price.total.toFixed(2)}`}
            </p>
            
          </div>


          {/* Texture Selection */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Paper Texture</p>
            <div className="flex flex-wrap gap-4">
              {textures.map((texture) => (
                <button
                  key={texture.name}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    selectedTexture === texture.name
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTexture(texture.name)}
                >
                  <span className="font-medium">{texture.name}</span>
                  <span className="text-sm text-gray-500">₹{texture.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Colour</p>
            <div className="flex gap-4">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(color.imageIndex)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    selectedImage === color.imageIndex 
                      ? 'border-blue-500 scale-110' 
                      : 'border-gray-200 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
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
            name: 'Peacock Garden',
            image: images[0],
            colors: ['beige', 'green']
          },
          {
            id: 2,
            name: 'Floral Delight',
            image: images[1],
            colors: ['blue', 'white']
          },
          {
            id: 3,
            name: 'Nature\'s Canvas',
            image: images[2],
            colors: ['green', 'brown']
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
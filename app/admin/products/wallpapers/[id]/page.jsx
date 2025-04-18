"use client";
import { useState } from 'react';
import { X, ArrowLeft, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductDetails = () => {
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: 'Lorem Ipsum',
    description: 'Lorem Ipsum Is A Dummy Text',
    category: 'Wall Covers',
    brand: 'Zendorr',
    sku: '#32453',
    stockQuantity: '211',
    regularPrice: '₹110.40',
    salePrice: '₹450',
    tags: ['Premium', 'Handcrafted'],
    images: []
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      progress: 100
    }));
    setProductData({
      ...productData,
      images: [...productData.images, ...newImages]
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-white rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#003f62]">Product Details</h1>
          <div className="text-sm text-gray-500">
            Home <span className="mx-1">&gt;</span> All Products <span className="mx-1">&gt;</span> Product Details
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name*</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                  value={productData.name}
                  onChange={(e) => setProductData({...productData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name*</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                  value={productData.brand}
                  onChange={(e) => setProductData({...productData, brand: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
              <textarea
                className="w-full border rounded-lg p-3 min-h-[150px] focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                value={productData.description}
                onChange={(e) => setProductData({...productData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                <select
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                  value={productData.category}
                  onChange={(e) => setProductData({...productData, category: e.target.value})}
                >
                  <option value="">Select category</option>
                  <option value="wall-covers">Wall Covers</option>
                  <option value="wooden-floor">Wooden Floor</option>
                  <option value="carpets">Carpets</option>
                  <option value="cushions">Cushions</option>
                  <option value="curtains">Curtains</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU*</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                  value={productData.sku}
                  onChange={(e) => setProductData({...productData, sku: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity*</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                  value={productData.stockQuantity}
                  onChange={(e) => setProductData({...productData, stockQuantity: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price*</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-3 pl-7 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                    value={productData.regularPrice}
                    onChange={(e) => setProductData({...productData, regularPrice: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-3 pl-7 focus:ring-2 focus:ring-[#003f62] focus:border-transparent transition-shadow"
                    value={productData.salePrice}
                    onChange={(e) => setProductData({...productData, salePrice: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="border rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#003f62] focus-within:border-transparent transition-shadow">
                <div className="flex flex-wrap gap-2 mb-2">
                  {productData.tags.map((tag, index) => (
                    <span key={index} className="bg-[#003f62]/10 text-[#003f62] px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {tag}
                      <button onClick={() => {
                        const newTags = productData.tags.filter((_, i) => i !== index);
                        setProductData({...productData, tags: newTags});
                      }}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Product Images*</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Drop your images here, or browse</p>
                  <p className="text-xs text-gray-400 mt-1">Maximum file size: 5MB</p>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              {productData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{image.name}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                      <div 
                        className="h-full bg-[#003f62] rounded-full transition-all duration-500"
                        style={{ width: `${image.progress}%` }}
                      />
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => {
                      const newImages = productData.images.filter((_, i) => i !== index);
                      setProductData({...productData, images: newImages});
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-4 md:p-6 border-t">
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Delete
          </button>
          <button className="px-6 py-2 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-colors">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
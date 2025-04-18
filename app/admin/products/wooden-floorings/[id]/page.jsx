"use client";
import { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const ViewProduct = () => {
  const router = useRouter();
  
  // Add subcategory state
  const [newSubCategory, setNewSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([
    'Engineered Wood',
    'Laminate Flooring',
    'Solid Wood',
    'Vinyl Flooring'
  ]);

  // Update productData state to include subcategory
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: 'wooden-floorings',
    size: '',
    thickness: '',
    dp: '', // Dealer Price
    gst: '',
    bp: '', // Base Price
    sampleCost: '',
    runningProfileCost: '',
    perUnit: '',
    sampleInventory: '',
    shade: '',
    finish: '',
    core: '',
    surface: '',
    image: null,
    imageUrl: '' // Add this for imgbb url
  });

  // Add this function for imgbb upload
  const uploadToImgbb = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', "285c2670df5fb801f4da9505f610a5ae"); // Replace with your API key

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Update handleImageUpload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadToImgbb(file);
      if (imageUrl) {
        setProductData({
          ...productData,
          image: {
            url: URL.createObjectURL(file),
            name: file.name
          },
          imageUrl: imageUrl
        });
      }
    }
  };

  // Add subcategory handlers
  const handleAddSubCategory = () => {
    if (newSubCategory.trim() && !subCategories.includes(newSubCategory)) {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log(productData);
    router.push('/admin/products/wooden-floorings');
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          type="button"
          onClick={() => router.back()}
          className="p-2 focus:bg-white rounded-lg transition-colors border border-gray-200"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#003f62]">Edit Wooden Flooring Item</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 md:p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.name}
                onChange={(e) => setProductData({...productData, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>

            <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category*</label>
      <div className="flex gap-2">
        <select
          value={productData.subcategory}
          onChange={(e) => setProductData({...productData, subcategory: e.target.value})}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="relative">
          <input
            type="text"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            placeholder="Add new"
            className="w-48 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
          />
          <button
            type="button"
            onClick={handleAddSubCategory}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>

            {/* Apply the same focus:border-blue-200 to all other input fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.brand}
                onChange={(e) => setProductData({...productData, brand: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size* (e.g 1218 x 197 x 8)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.size}
                onChange={(e) => setProductData({...productData, size: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thickness*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.thickness}
                onChange={(e) => setProductData({...productData, thickness: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Price (DP)*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.dp}
                onChange={(e) => setProductData({...productData, dp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST (%)*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.gst}
                onChange={(e) => setProductData({...productData, gst: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (BP)*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.bp}
                onChange={(e) => setProductData({...productData, bp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sample Cost*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.sampleCost}
                onChange={(e) => setProductData({...productData, sampleCost: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Running Profile Cost*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.runningProfileCost}
                onChange={(e) => setProductData({...productData, runningProfileCost: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Per sqft/box*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.perUnit}
                onChange={(e) => setProductData({...productData, perUnit: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sample Inventory*</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.sampleInventory}
                onChange={(e) => setProductData({...productData, sampleInventory: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shade*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.shade}
                onChange={(e) => setProductData({...productData, shade: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Finish*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.finish}
                onChange={(e) => setProductData({...productData, finish: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Core*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.core}
                onChange={(e) => setProductData({...productData, core: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surface*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.surface}
                onChange={(e) => setProductData({...productData, surface: e.target.value})}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image* </label>
          
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 transition-colors hover:border-gray-400 focus-within:border-blue-200">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={handleImageUpload}
              />
              {!productData.image ? (
                <label htmlFor="imageUpload" className="cursor-pointer block text-center">
                  <Upload className="mx-auto w-16 h-16 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                </label>
              ) : (
                <div className="relative w-full h-64">
                  <Image
                    src={productData.image.url}
                    alt={productData.image.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setProductData({...productData, image: null})}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md focus:bg-gray-50 transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note: If you upload new image ,it replaces current image </label>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-6 md:p-8 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button 
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors">
            Delete
          </button>
          <button className="px-6 py-2.5 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 font-medium transition-colors">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default ViewProduct;
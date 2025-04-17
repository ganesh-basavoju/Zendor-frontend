"use client";
import { useState } from 'react';
import { Folder, Plus, Edit2, Trash2, X } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Wallpapers', 
      itemCount: 24, 
      image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg'
    },
    { 
      id: 2, 
      name: 'Wooden Floorings', 
      itemCount: 18, 
      image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg'
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  const handleAddCategory = () => {
    if (!formData.name.trim()) return;
    
    const newCategory = {
      id: Date.now(),
      name: formData.name,
      itemCount: 0,
      color: `bg-${['blue', 'amber', 'green', 'purple', 'rose'][Math.floor(Math.random() * 5)]}-500`
    };

    setCategories(prev => [...prev, newCategory]);
    setFormData({ name: '' });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Create New Category Card */}
        <button 
          onClick={() => setShowModal(true)}
          className="aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <Plus className="text-gray-600" />
          </div>
          <span className="text-gray-600 font-medium">Add Category</span>
        </button>

        {/* Category Cards */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative aspect-square rounded-xl overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button 
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(category);
                    }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                <p className="text-white/80 mt-1">
                  {category.itemCount} products
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Enter category name"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
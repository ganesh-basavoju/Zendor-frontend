"use client";
import { useRouter } from 'next/navigation';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProductCard = ({ product, onDelete,category }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push(`/admin/products/${product.id}`);
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
    setShowMenu(false);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => router.push(`/admin/products/${category}/${product.id}`)}
    >
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <button 
            className="p-1 bg-white rounded-lg shadow-md hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={20} className="text-gray-600" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg py-1 border z-10">
              <button 
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                onClick={handleEdit}
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button 
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price</span>
            <span className="font-medium text-[#003f62]">{product.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Sales</span>
            <span className="text-sm">{product.sales}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Stock</span>
            <span className="text-sm">{product.remaining} units</span>
          </div>
          <div className="pt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#003f62]" 
                style={{ width: `${(product.remaining / product.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
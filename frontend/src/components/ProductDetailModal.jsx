import React from 'react';
import { X, Box, IndianRupee } from 'lucide-react';

const ProductDetailModal = ({ product, onClose, onEdit }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all">
        
        {/* Header */}
        <div className="relative h-64 bg-gray-100">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="absolute bottom-4 left-4 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-green-100 text-green-700 rounded-lg">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Price</p>
                <p className="text-lg font-bold text-gray-900">₹{Number(product.price).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Stock Status</p>
                <p className={`text-base font-bold ${product.stockQuantity > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(product);
              }}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition shadow-md"
            >
              Edit Product
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;

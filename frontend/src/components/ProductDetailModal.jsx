import React from 'react';
import { X, Box, IndianRupee, ShoppingBag } from 'lucide-react';

const ProductDetailModal = ({ product, onClose, onEdit, onBuy, isAdminView }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all border border-gray-100">
        
        {/* Full-width Image Header without side gaps */}
        <div className="relative w-full h-64 sm:h-80 bg-gray-100 overflow-hidden">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover object-center block"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <span className="absolute bottom-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md tracking-wide uppercase">
            {product.category}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* Price & Stock Stats Card */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 sm:p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">Price</p>
                <p className="text-base sm:text-xl font-extrabold text-gray-900">₹{Number(product.price).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 sm:p-3 bg-blue-100 text-brand-700 rounded-xl">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">Stock Status</p>
                <p className={`text-xs sm:text-base font-bold ${product.stockQuantity > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded-xl transition"
            >
              Close
            </button>

            {/* If Admin View -> Show Edit Product. If Store View -> Show Buy Now */}
            {isAdminView ? (
              <button
                onClick={() => {
                  onClose();
                  onEdit(product);
                }}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-md active:scale-95"
              >
                Edit Product
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  if (onBuy) onBuy(product);
                }}
                disabled={product.stockQuantity <= 0}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-md active:scale-95 ${
                  product.stockQuantity > 0
                    ? 'bg-brand-600 hover:bg-brand-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.stockQuantity > 0 ? 'Buy Now' : 'Out of Stock'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;

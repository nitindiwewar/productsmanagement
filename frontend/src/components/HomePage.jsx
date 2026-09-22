import React from 'react';
import { Search, Eye, PackageCheck } from 'lucide-react';

const HomePage = ({ products, onSelectProduct, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, loading }) => {
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
      
      {/* Page Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-xs text-gray-500 mt-0.5">Available products</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Filter Category Pills - Touch Scrollable */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition whitespace-nowrap active:scale-95 ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid - Responsive Grid Columns */}
      {loading ? (
        <div className="text-center py-16 text-gray-500 text-sm">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-gray-100 shadow-sm space-y-3">
          <PackageCheck className="w-10 sm:w-12 h-10 sm:h-12 text-gray-300 mx-auto" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">No Products Found</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            No products match the selected criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-44 sm:h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-lg shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 group-hover:text-brand-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.description || 'No description'}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs text-gray-400 block font-medium">Price</span>
                    <span className="text-base sm:text-lg font-extrabold text-gray-900">
                      ₹{Number(product.price).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex items-center space-x-1 bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-700 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default HomePage;

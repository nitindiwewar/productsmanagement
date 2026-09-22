import React, { useState } from 'react';
import { 
  Package, 
  IndianRupee, 
  AlertTriangle, 
  Layers, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  RefreshCw
} from 'lucide-react';

const AdminDashboard = ({ 
  products, 
  onOpenAddModal, 
  onEditProduct, 
  onDeleteProduct, 
  onViewProduct,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Metrics Calculations
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, item) => acc + Number(item.stockQuantity || 0), 0);
  const totalValue = products.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.stockQuantity || 0)), 0);
  const lowStockCount = products.filter(item => Number(item.stockQuantity) <= 5).length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  // Filtered Products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
      
      {/* Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Manage product inventory and perform CRUD operations.
          </p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={onRefresh}
            className="p-2 sm:p-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Total Products */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{totalProducts}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{categoriesCount} Categories</p>
          </div>
          <div className="p-3 bg-blue-50 text-brand-600 rounded-2xl">
            <Package className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
        </div>

        {/* Total Inventory Value */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Value</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">₹{totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{totalStock} Units</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
            <IndianRupee className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Low Stock</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{lowStockCount}</h3>
            <p className="text-xs text-red-500 font-medium mt-0.5">Items &le; 5 units</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{categoriesCount}</h3>
            <p className="text-xs text-gray-500 mt-0.5">Active</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Layers className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
        </div>

      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Table Filter Controls */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-medium text-gray-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

        </div>

        {/* Data Table - Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 px-4 sm:px-6">Product</th>
                <th className="py-3 px-3 sm:px-4">Category</th>
                <th className="py-3 px-3 sm:px-4">Price (₹)</th>
                <th className="py-3 px-3 sm:px-4">Stock</th>
                <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 text-xs sm:text-sm">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Name & Thumbnail */}
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.imageUrl || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-gray-100 shadow-sm"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 hover:text-brand-600 cursor-pointer line-clamp-1 max-w-[140px] sm:max-w-xs" onClick={() => onViewProduct(product)}>
                            {product.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1 max-w-[140px] sm:max-w-xs">
                            {product.description || 'No description'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 sm:px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 sm:px-4 font-semibold text-gray-900">
                      ₹{Number(product.price).toFixed(2)}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center space-x-1.5">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          product.stockQuantity > 10 ? 'bg-green-500' : product.stockQuantity > 0 ? 'bg-amber-500' : 'bg-red-500'
                        }`}></span>
                        <span className="font-medium text-gray-700">
                          {product.stockQuantity}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        
                        <button
                          onClick={() => onViewProduct(product)}
                          className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onEditProduct(product)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

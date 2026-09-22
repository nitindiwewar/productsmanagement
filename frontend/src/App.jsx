import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import ProductFormModal from './components/ProductFormModal';
import ProductDetailModal from './components/ProductDetailModal';
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error('API Error:', err.message);
      showToast('Could not connect to backend server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // CRUD Handler - Create / Update
  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, productData);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
        showToast('Product updated successfully!');
      } else {
        const created = await createProduct(productData);
        setProducts(prev => [created, ...prev]);
        showToast('Product added successfully!');
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      showToast('Failed to save product details.', 'error');
    }
  };

  // CRUD Handler - Delete
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        showToast('Product deleted from inventory.');
      } catch (error) {
        showToast('Failed to delete product.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium transition-all transform animate-bounce ${
          toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        totalProducts={products.length}
      />

      {/* URL Route Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Store Front Route */}
          <Route path="/" element={
            <HomePage
              products={products}
              onSelectProduct={(product) => setViewingProduct(product)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              loading={loading}
            />
          } />

          {/* Separate Admin Dashboard Route */}
          <Route path="/admin" element={
            <AdminDashboard
              products={products}
              onOpenAddModal={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              onEditProduct={(product) => {
                setEditingProduct(product);
                setIsFormOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
              onViewProduct={(product) => setViewingProduct(product)}
              onRefresh={fetchProductData}
              loading={loading}
            />
          } />

          {/* Redirect any unmatched path to Home Store Front */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-xs text-gray-500">
        <p>&copy; 2026 RoyalsWebtech. Product Management System.</p>
      </footer>

      {/* Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSaveProduct}
        initialData={editingProduct}
      />

      {/* Details View Modal */}
      <ProductDetailModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsFormOpen(true);
        }}
      />

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

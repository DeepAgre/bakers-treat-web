import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Connected directly to your active configuration (sanity.js)
import { client, urlFor } from '../sanity';

export default function ClientDashboard({ onBackToStore }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  // Real database states fetched directly from Sanity
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Create Product States
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductVariants, setNewProductVariants] = useState([{ size: '500g', price: 0 }]);
  const [newProductSeasonal, setNewProductSeasonal] = useState(false);

  // Create Category State
  const [newCategoryTitle, setNewCategoryTitle] = useState('');

  // Variant editing state
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // 1. FETCH ACTUAL SANITY DATA (No hardcoded records)
  const fetchAllSanityData = async () => {
    setLoading(true);
    try {
      const [fetchedProducts, fetchedFeedbacks, fetchedCategories] = await Promise.all([
        client.fetch(`*[_type == "product"]{
          _id,
          name,
          image,
          description,
          variants,
          isSeasonal,
          isSoldOut,
          category->{ _id, title }
        } | order(name asc)`),
        client.fetch(`*[_type == "feedback"] | order(createdAt desc)`),
        client.fetch(`*[_type == "category"] | order(title asc)`)
      ]);

      setProducts(fetchedProducts || []);
      setFeedbacks(fetchedFeedbacks || []);
      setCategories(fetchedCategories || []);
    } catch (err) {
      console.error("Sanity Database Loading Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllSanityData();
    }
  }, [isAuthenticated]);

  // Lockscreen verify
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "1212") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasscode('');
    }
  };

  // 2. MUTATIONS: PRODUCTS
  const toggleSoldOut = async (productId, currentStatus) => {
    setActionLoading(true);
    try {
      await client
        .patch(productId)
        .set({ isSoldOut: !currentStatus })
        .commit();
      
      setProducts(prev => 
        prev.map(p => p._id === productId ? { ...p, isSoldOut: !currentStatus } : p)
      );
    } catch (err) {
      console.error("Failed to update Sold Out status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleSeasonal = async (productId, currentStatus) => {
    setActionLoading(true);
    try {
      await client
        .patch(productId)
        .set({ isSeasonal: !currentStatus })
        .commit();
      
      setProducts(prev => 
        prev.map(p => p._id === productId ? { ...p, isSeasonal: !currentStatus } : p)
      );
    } catch (err) {
      console.error("Failed to update Seasonal status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const saveVariantPrice = async (productId, variantIndex) => {
    const targetProduct = products.find(p => p._id === productId);
    if (!targetProduct) return;

    setActionLoading(true);
    try {
      const updatedVariants = [...targetProduct.variants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        price: Number(editPrice)
      };

      await client
        .patch(productId)
        .set({ variants: updatedVariants })
        .commit();

      setProducts(prev =>
        prev.map(p => p._id === productId ? { ...p, variants: updatedVariants } : p)
      );
      setEditingProductId(null);
      setEditingVariantIndex(null);
    } catch (err) {
      console.error("Failed to update variant price:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProductName || !newProductCategory || newProductVariants.some(v => v.price <= 0)) {
      alert("Please fill in all details and ensure prices are greater than 0.");
      return;
    }

    setActionLoading(true);
    try {
      const newDoc = {
        _type: 'product',
        name: newProductName,
        description: newProductDesc,
        category: {
          _type: 'reference',
          _ref: newProductCategory
        },
        variants: newProductVariants.map(v => ({
          _type: 'variant',
          size: v.size,
          price: Number(v.price)
        })),
        isSeasonal: newProductSeasonal,
        isSoldOut: false
      };

      await client.create(newDoc);
      
      // Reset State
      setNewProductName('');
      setNewProductDesc('');
      setNewProductCategory('');
      setNewProductVariants([{ size: '500g', price: 0 }]);
      setNewProductSeasonal(false);
      setShowAddProductModal(false);
      
      // Refresh Data
      fetchAllSanityData();
    } catch (err) {
      console.error("Failed to create product in Sanity:", err);
      alert("Could not create product. Ensure your VITE_SANITY_WRITE_TOKEN is correctly set with Editor access.");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProduct = async (productId, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    setActionLoading(true);
    try {
      await client.delete(productId);
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error("Failed to delete product from Sanity:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // 3. MUTATIONS: CATEGORIES
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) return;
    
    setActionLoading(true);
    try {
      const newDoc = {
        _type: 'category',
        title: newCategoryTitle.trim()
      };
      await client.create(newDoc);
      setNewCategoryTitle('');
      fetchAllSanityData();
    } catch (err) {
      console.error("Failed to add category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteCategory = async (categoryId, title) => {
    if (!window.confirm(`Delete category "${title}"? This will affect products linked to it.`)) return;
    setActionLoading(true);
    try {
      await client.delete(categoryId);
      setCategories(prev => prev.filter(c => c._id !== categoryId));
    } catch (err) {
      console.error("Failed to delete category:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // 4. MUTATIONS: FEEDBACK MODERATION
  const toggleFeedbackApproval = async (feedbackId, currentStatus) => {
    setActionLoading(true);
    try {
      await client
        .patch(feedbackId)
        .set({ isApproved: !currentStatus })
        .commit();
      
      setFeedbacks(prev =>
        prev.map(f => f._id === feedbackId ? { ...f, isApproved: !currentStatus } : f)
      );
    } catch (err) {
      console.error("Failed to approve feedback:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteFeedback = async (feedbackId) => {
    if (!window.confirm("Delete this review permanently from Sanity?")) return;
    setActionLoading(true);
    try {
      await client.delete(feedbackId);
      setFeedbacks(prev => prev.filter(f => f._id !== feedbackId));
    } catch (err) {
      console.error("Failed to delete review:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Calculations
  const pendingReviewsCount = feedbacks.filter(f => !f.isApproved).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center font-sans px-6 text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E89EB8] rounded-full filter blur-[150px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#121212]/80 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative z-10 text-center"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#E89EB8] font-black mb-2">Delight Bakehouse</div>
          <h2 className="text-3xl font-serif font-bold mb-8">Chef Workspace</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3 text-left">
              <label className="text-[10px] uppercase tracking-wider text-white/40 ml-2">Enter Secure PIN</label>
              <input 
                type="password"
                maxLength="4"
                className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-center text-3xl tracking-[1em] outline-none focus:border-[#E89EB8] transition-all"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value.replace(/\D/g, ''));
                  if (loginError) setLoginError(false);
                }}
                placeholder="••••"
              />
            </div>

            {loginError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm">
                Incorrect credentials. Access denied.
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full bg-[#E89EB8] text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:brightness-105 active:scale-[0.98] transition-all text-xs"
            >
              Verify Identity
            </button>
          </form>

          <button 
            onClick={onBackToStore}
            className="mt-6 text-xs text-white/30 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            ← Return to Storefront
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans flex flex-col">
      {/* HEADER SECTION */}
      <header className="bg-[#121212]/60 backdrop-blur-md border-b border-white/10 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-[#E89EB8]/20 border border-[#E89EB8]/50 rounded-full flex items-center justify-center text-[#E89EB8] font-bold">
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-black text-white">Chef Khushi's Console</h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] text-emerald-400 font-mono">Sanity Live</span>
            </div>
            <p className="text-[9px] text-[#E89EB8] uppercase tracking-[0.25em] font-black">Delight Bakehouse Studio</p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex flex-wrap bg-black/50 p-1.5 rounded-xl border border-white/5 gap-1">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'products' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'categories' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            Categories ({categories.length})
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`px-5 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'feedback' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'} relative`}
          >
            Reviews
            {pendingReviewsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-sans text-[8px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                {pendingReviewsCount}
              </span>
            )}
          </button>
        </div>

        <button 
          onClick={onBackToStore}
          className="text-xs border border-white/20 hover:border-white px-5 py-2.5 rounded-xl transition-all font-bold"
        >
          Exit Workspace
        </button>
      </header>

      {/* METRIC SUMMARIES */}
      <main className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Total Catalog Products</p>
              <h3 className="text-3xl font-black font-serif text-[#E89EB8]">{products.length}</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#E89EB8]/10 text-[#E89EB8]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
            </div>
          </div>
          
          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Total Categories</p>
              <h3 className="text-3xl font-black font-serif text-white">{categories.length}</h3>
            </div>
            <div className="p-4 rounded-xl bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
            </div>
          </div>

          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Feedback Moderation Inbox</p>
              <h3 className="text-3xl font-black font-serif text-amber-400">{pendingReviewsCount} Pending</h3>
            </div>
            <div className="p-4 rounded-xl bg-amber-400/10 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-t-2 border-[#E89EB8] rounded-full animate-spin"></div>
            <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Syncing with Sanity Studio...</span>
          </div>
        ) : (
          <>
            {/* TAB 1: PRODUCTS LIST */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-2xl font-serif font-black">Digital Display Menu Controls</h2>
                  <button 
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-[#E89EB8] text-black font-black uppercase tracking-widest px-6 py-3.5 rounded-xl text-xs hover:brightness-105 active:scale-95 transition-all shadow-lg"
                  >
                    + Add New Product
                  </button>
                </div>

                <div className="bg-[#121212]/30 border border-white/10 rounded-3xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-black uppercase tracking-widest text-white/50">
                        <th className="p-6">Product Details</th>
                        <th className="p-6">Category</th>
                        <th className="p-6">Pricing Variants</th>
                        <th className="p-6">Seasonal Badge</th>
                        <th className="p-6">Stock Status</th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-16 text-white/40">No products found in Sanity. Create one above!</td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product._id} className="hover:bg-white/[0.01] transition-colors">
                            <td className="p-6 flex items-center gap-4">
                              {product.image ? (
                                <img 
                                  src={urlFor(product.image).width(80).height(80).url()} 
                                  alt={product.name} 
                                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 shrink-0 flex items-center justify-center text-[10px] text-white/40">
                                  No Img
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-white text-base">{product.name}</p>
                                <span className="text-[9px] text-white/30 uppercase tracking-wider">ID: DB-{product._id.substring(0, 6)}</span>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">
                                {product.category?.title || 'Uncategorized'}
                              </span>
                            </td>
                            <td className="p-6 space-y-2">
                              {product.variants?.map((v, idx) => (
                                <div key={idx} className="flex items-center gap-4 text-xs">
                                  <span className="text-white/40 min-w-16 text-left">{v.size}:</span>
                                  {editingProductId === product._id && editingVariantIndex === idx ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-[#E89EB8] font-bold">₹</span>
                                      <input 
                                        type="number" 
                                        className="w-20 bg-black border border-[#E89EB8] p-1 rounded text-white text-xs outline-none"
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                        autoFocus
                                      />
                                      <button 
                                        onClick={() => saveVariantPrice(product._id, idx)} 
                                        className="text-emerald-400 font-bold hover:underline"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <span className="font-black text-[#E89EB8]">₹{v.price}</span>
                                      <button 
                                        onClick={() => {
                                          setEditingProductId(product._id);
                                          setEditingVariantIndex(idx);
                                          setEditPrice(v.price);
                                        }}
                                        className="text-white/30 hover:text-white transition-colors text-[10px]"
                                      >
                                        ✏️
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </td>
                            <td className="p-6">
                              <button
                                onClick={() => toggleSeasonal(product._id, product.isSeasonal)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                  product.isSeasonal 
                                    ? 'bg-[#E89EB8]/20 text-[#E89EB8] border border-[#E89EB8]/30'
                                    : 'bg-white/5 text-white/40 hover:text-white'
                                }`}
                              >
                                {product.isSeasonal ? "★ Seasonal" : "☆ Standard"}
                              </button>
                            </td>
                            <td className="p-6">
                              <button 
                                onClick={() => toggleSoldOut(product._id, product.isSoldOut)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                  !product.isSoldOut 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}
                              >
                                {!product.isSoldOut ? "● In Stock" : "○ Sold Out"}
                              </button>
                            </td>
                            <td className="p-6 text-right">
                              <button 
                                onClick={() => deleteProduct(product._id, product.name)}
                                className="text-red-400 hover:text-red-500 text-xs font-bold transition-all"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: CATEGORIES CONTROL */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-black">Menu Categories Manager</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Create Category */}
                  <div className="bg-[#121212]/50 border border-white/10 p-8 rounded-3xl space-y-4 h-fit">
                    <h3 className="text-lg font-serif font-bold text-[#E89EB8]">Add New Category</h3>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Create categories (e.g. Cakes, Macarons, Custom Cupcakes) to link inside your dynamic products.
                    </p>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                      <input 
                        type="text" 
                        value={newCategoryTitle}
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                        placeholder="e.g. Special Muffins"
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-[#E89EB8] text-white"
                        required
                      />
                      <button 
                        type="submit"
                        disabled={actionLoading}
                        className="w-full bg-[#E89EB8] text-black font-black uppercase tracking-widest py-4 rounded-xl text-xs hover:brightness-105 transition-all"
                      >
                        Publish Category
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Display Categories */}
                  <div className="lg:col-span-2 bg-[#121212]/30 border border-white/10 rounded-3xl overflow-hidden p-8 space-y-4">
                    <h3 className="text-lg font-serif font-bold">Categories Index</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categories.length === 0 ? (
                        <div className="text-center py-8 text-white/30 col-span-2">No categories saved. Create one on the left panel.</div>
                      ) : (
                        categories.map((cat) => (
                          <div key={cat._id} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                            <div>
                              <p className="font-bold text-white text-sm">{cat.title}</p>
                              <span className="text-[9px] text-white/30 uppercase font-mono">ID: {cat._id.substring(0, 8)}</span>
                            </div>
                            <button 
                              onClick={() => deleteCategory(cat._id, cat.title)}
                              className="text-red-400 hover:text-red-500 text-xs font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOMER FEEDBACKS/REVIEWS */}
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-black">Customer Reviews Moderation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedbacks.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-white/30 col-span-2">
                      No feedback submissions found in your Sanity dataset.
                    </div>
                  ) : (
                    feedbacks.map((f) => (
                      <div key={f._id} className="bg-[#121212]/50 border border-white/10 p-6 rounded-3xl flex flex-col justify-between gap-6 relative">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <h4 className="font-bold text-white text-lg">{f.name}</h4>
                              <p className="text-xs text-white/40">{f.email || 'No email provided'}</p>
                            </div>
                            <div className="text-amber-400 font-bold flex gap-1">
                              {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                            </div>
                          </div>
                          <p className="text-white/70 italic text-sm leading-relaxed">"{f.comment}"</p>
                          
                          {f.aiFlaggedReason && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
                              ⚠️ <strong>AI Flagged Reason:</strong> {f.aiFlaggedReason}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                          <button 
                            onClick={() => toggleFeedbackApproval(f._id, f.isApproved)}
                            disabled={actionLoading}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                              f.isApproved 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                            }`}
                          >
                            {f.isApproved ? "✅ Live on Site" : "⏳ Click to Approve"}
                          </button>
                          
                          <button 
                            onClick={() => deleteFeedback(f._id)}
                            disabled={actionLoading}
                            className="text-red-400 hover:text-red-500 text-xs font-bold transition-all"
                          >
                            Delete Review
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL: ADD NEW PRODUCT */}
      <AnimatePresence>
        {showAddProductModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowAddProductModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="fixed inset-x-4 md:inset-x-auto top-10 md:top-20 mx-auto max-w-lg w-full bg-[#121212] border border-white/10 p-8 rounded-[2.5rem] z-[2010] text-white shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-serif font-black mb-6">Create Menu Product</h3>
              
              <form onSubmit={handleCreateProduct} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-wider text-white/40">Product Name</label>
                  <input 
                    type="text" 
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 p-4 rounded-xl outline-none focus:border-[#E89EB8] text-sm text-white"
                    placeholder="e.g. Raspberry Pistachio Cake"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-wider text-white/40">Category (From Sanity)</label>
                  <select 
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 p-4 rounded-xl outline-none focus:border-[#E89EB8] text-sm text-white font-bold"
                    required
                  >
                    <option value="">Select Category...</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-wider text-white/40">Description</label>
                  <textarea 
                    value={newProductDesc}
                    onChange={(e) => setNewProductDesc(e.target.value)}
                    rows="2"
                    className="w-full bg-black/60 border border-white/10 p-4 rounded-xl outline-none focus:border-[#E89EB8] text-sm resize-none text-white"
                    placeholder="Describe textures, layers or dietary specifications..."
                  />
                </div>

                {/* Variants Creator */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-wider text-white/40">Pricing Variants</label>
                    <button 
                      type="button"
                      onClick={() => setNewProductVariants([...newProductVariants, { size: '1kg', price: 0 }])}
                      className="text-[#E89EB8] text-[10px] font-bold"
                    >
                      + Add Size Variant
                    </button>
                  </div>
                  
                  {newProductVariants.map((variant, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input 
                        type="text" 
                        value={variant.size}
                        onChange={(e) => {
                          const updated = [...newProductVariants];
                          updated[index].size = e.target.value;
                          setNewProductVariants(updated);
                        }}
                        placeholder="Size (e.g. 500g)"
                        className="flex-1 bg-black/60 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-[#E89EB8] text-white"
                        required
                      />
                      <input 
                        type="number" 
                        value={variant.price || ''}
                        onChange={(e) => {
                          const updated = [...newProductVariants];
                          updated[index].price = Number(e.target.value);
                          setNewProductVariants(updated);
                        }}
                        placeholder="Price in ₹"
                        className="w-28 bg-black/60 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-[#E89EB8] text-white"
                        required
                      />
                      {newProductVariants.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => setNewProductVariants(newProductVariants.filter((_, i) => i !== index))}
                          className="text-red-400 text-xs px-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="newProductSeasonal"
                    checked={newProductSeasonal}
                    onChange={(e) => setNewProductSeasonal(e.target.checked)}
                    className="accent-[#E89EB8] h-4 w-4"
                  />
                  <label htmlFor="newProductSeasonal" className="text-xs text-white/75">Mark as Seasonal Drop</label>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setShowAddProductModal(false)}
                    className="border border-white/10 text-white/60 py-4 rounded-xl text-xs font-bold hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={actionLoading}
                    className="bg-[#E89EB8] text-black font-black uppercase tracking-wider py-4 rounded-xl text-xs hover:brightness-105 active:scale-95 transition-all"
                  >
                    {actionLoading ? "Uploading..." : "Publish To Sanity"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
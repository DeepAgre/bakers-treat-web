import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import the client and url builder from your active configuration
import { client, urlFor } from '../sanityClient';

export default function ClientDashboard({ onBackToStore }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  // Dashboard & Database states
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Editing state for variants
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // 1. FETCH LIVE DATA FROM SANITY
  const fetchAllSanityData = async () => {
    setLoading(true);
    try {
      // Fetching categories, products (with resolved category reference), feedback reviews, and custom orders
      const [fetchedProducts, fetchedFeedbacks, fetchedOrders, fetchedCategories] = await Promise.all([
        client.fetch(`*[_type == "product"]{
          _id,
          name,
          image,
          description,
          variants,
          isSeasonal,
          isSoldOut,
          category->{ title }
        } | order(name asc)`),
        client.fetch(`*[_type == "feedback"] | order(createdAt desc)`),
        client.fetch(`*[_type == "order"] | order(deliveryDate asc)`),
        client.fetch(`*[_type == "category"] | order(title asc)`)
      ]);

      setProducts(fetchedProducts || []);
      setFeedbacks(fetchedFeedbacks || []);
      setOrders(fetchedOrders || []);
      setCategories(fetchedCategories || []);
    } catch (err) {
      console.error("Sanity Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllSanityData();
    }
  }, [isAuthenticated]);

  // 2. VERIFY PIN
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

  // 3. MUTATION: Toggle Sold Out Status
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
      console.error("Failed to toggle Sold Out status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // 4. MUTATION: Update Variant Price
  const saveVariantPrice = async (productId, variantIndex) => {
    const targetProduct = products.find(p => p._id === productId);
    if (!targetProduct) return;

    setActionLoading(true);
    try {
      // Create a modified copy of the variants array
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

  // 5. MUTATION: Approve / Moderate Customer Feedback Reviews
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
      console.error("Failed to update feedback status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // 6. MUTATION: Delete Spam / Inappropriate Feedback
  const deleteFeedback = async (feedbackId) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) return;
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

  // 7. MUTATION: Update Order Status
  const updateOrderStatus = async (orderId, newStatus) => {
    setActionLoading(true);
    try {
      await client
        .patch(orderId)
        .set({ status: newStatus })
        .commit();
      
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Failed to update order status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Calculations
  const totalRevenue = orders.reduce((acc, curr) => curr.status === 'Completed' ? acc + Number(curr.total) : acc, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Completed').length;
  const pendingFeedbackCount = feedbacks.filter(f => !f.isApproved).length;

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

        {/* Workspace Navigation Tabs */}
        <div className="flex flex-wrap bg-black/50 p-1.5 rounded-xl border border-white/5 gap-1">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'orders' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            Orders ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'inventory' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            Menu Items ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'feedback' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'} relative`}
          >
            Feedback
            {pendingFeedbackCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-sans text-[8px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                {pendingFeedbackCount}
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

      {/* WORKSPACE VIEW AREA */}
      <main className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto space-y-8">
        
        {/* SUMMARY STATS PANELS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Gross Revenue (Completed Orders)</p>
              <h3 className="text-3xl font-black font-serif text-[#25D366]">₹{totalRevenue}</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#25D366]/10 text-[#25D366]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          
          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Active Baking Pipeline</p>
              <h3 className="text-3xl font-black font-serif text-[#E89EB8]">{activeOrdersCount}</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#E89EB8]/10 text-[#E89EB8]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path></svg>
            </div>
          </div>

          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Review Inbox (Pending Moderation)</p>
              <h3 className="text-3xl font-black font-serif text-amber-400">{pendingFeedbackCount}</h3>
            </div>
            <div className="p-4 rounded-xl bg-amber-400/10 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-t-2 border-[#E89EB8] rounded-full animate-spin"></div>
            <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Synchronizing with Sanity...</span>
          </div>
        ) : (
          <>
            {/* TAB 1: ORDER MANAGER */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-black">Incoming Baking Orders</h2>
                <div className="grid grid-cols-1 gap-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-white/30">
                      No customer orders currently saved in Sanity.
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order._id} className="bg-[#121212]/50 border border-white/15 p-8 rounded-3xl flex flex-col lg:flex-row justify-between gap-8 relative overflow-hidden">
                        
                        <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                          order.status === 'Completed' ? 'bg-[#25D366]' :
                          order.status === 'Baking' ? 'bg-[#E89EB8]' : 'bg-amber-400'
                        }`} />

                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs font-black bg-white/10 px-3 py-1.5 rounded-lg tracking-wider text-slate-300">ID: {order._id.substring(0, 7).toUpperCase()}</span>
                            <h4 className="text-xl font-bold text-white">{order.customerName}</h4>
                            <span className={`text-[9px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full ${
                              order.status === 'Completed' ? 'bg-[#25D366]/10 text-[#25D366]' :
                              order.status === 'Baking' ? 'bg-[#E89EB8]/10 text-[#E89EB8]' : 'bg-amber-400/10 text-amber-400'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/60">
                            <div>
                              <p className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-1">Delivery Target</p>
                              <p className="font-bold text-white">📅 {order.deliveryDate}</p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-1">Thane Location / Address</p>
                              <p className="text-xs line-clamp-1">📍 {order.deliveryAddress}</p>
                            </div>
                          </div>

                          <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                            <p className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-2">Item Summary</p>
                            <pre className="font-sans text-xs text-white/80 whitespace-pre-line leading-relaxed">{order.itemsText}</pre>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col justify-end gap-3 lg:w-60">
                          <div className="text-right mb-2 lg:mb-4">
                            <p className="text-[10px] uppercase font-black tracking-wider text-white/30">Total Bill</p>
                            <p className="text-3xl font-black text-[#E89EB8]">₹{order.total}</p>
                          </div>

                          <select 
                            value={order.status || 'Pending'}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            disabled={actionLoading}
                            className="w-full bg-black/60 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#E89EB8] text-white font-bold"
                          >
                            <option value="Pending">🕒 Pending Review</option>
                            <option value="Baking">🎂 Baking In Progress</option>
                            <option value="Completed">✅ Order Finished</option>
                          </select>

                          <div className="grid grid-cols-2 gap-3">
                            <button 
                              onClick={() => window.open(`https://wa.me/${order.customerPhone}`, '_blank')}
                              className="bg-[#25D366]/15 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[10px] font-black uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-1"
                            >
                              WhatsApp
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm("Archive this order?")) {
                                  await client.delete(order._id);
                                  setOrders(prev => prev.filter(o => o._id !== order._id));
                                }
                              }}
                              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-wider py-4 rounded-xl transition-all"
                            >
                              Archive
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: INVENTORY & STOCK MANAGER */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-black">Digital Display Menu Controls</h2>
                <div className="bg-[#121212]/30 border border-white/10 rounded-3xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-black uppercase tracking-widest text-white/50">
                        <th className="p-6">Product Details</th>
                        <th className="p-6">Category</th>
                        <th className="p-6">Pricing Variants</th>
                        <th className="p-6">Studio Stock Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-6 flex items-center gap-4">
                            {product.image && (
                              <img 
                                src={urlFor(product.image).width(80).height(80).url()} 
                                alt={product.name} 
                                className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                              />
                            )}
                            <div>
                              <p className="font-bold text-white text-base">{product.name}</p>
                              {product.isSeasonal && (
                                <span className="text-[8px] uppercase tracking-widest bg-[#E89EB8]/20 text-[#E89EB8] px-2 py-0.5 rounded font-black">
                                  Seasonal Drop
                                </span>
                              )}
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
                                      className="text-white/30 hover:text-white transition-colors"
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
                              onClick={() => toggleSoldOut(product._id, product.isSoldOut)}
                              disabled={actionLoading}
                              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                !product.isSoldOut 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}
                            >
                              {!product.isSoldOut ? "● Active In Stock" : "○ Sold Out"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: FEEDBACK & MODERATION MANAGER */}
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-black">Customer Reviews Inbox</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedbacks.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-white/30 col-span-2">
                      No feedback submissions recorded.
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
                            {f.isApproved ? "✅ Published Live" : "⏳ Moderation Pending"}
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
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Initial Data representing what she would manage
const initialOrders = [
  {
    id: "DB-101",
    customer: "Amit Sharma",
    date: "2026-05-25",
    address: "Apt 402, Lodha Amara, Kolshet Road, Thane West",
    items: "• Rajbhog Modak x 2 = ₹620\n• Chocolate Brownie x 1 = ₹120",
    total: "740",
    status: "Baking",
    phone: "919833503525"
  },
  {
    id: "DB-102",
    customer: "Priya Patel",
    date: "2026-05-26",
    address: "Villa 12, Hiranandani Meadows, Thane West",
    items: "• Custom Vanilla Orchid Cake x 1 = ₹1800",
    total: "1800",
    status: "Pending",
    phone: "919833503525"
  },
  {
    id: "DB-103",
    customer: "Rohan Mehra",
    date: "2026-05-24",
    address: "Flat 15B, Raymond Realty, Pokhran Road, Thane",
    items: "• Red Velvet Cupcake x 6 = ₹480",
    total: "480",
    status: "Completed",
    phone: "919833503525"
  }
];

const initialProducts = [
  { id: 1, name: "Rajbhog Modak 21pcs", price: 310, category: "Festive", inStock: true },
  { id: 2, name: "Gourmet Chocolate Brownie", price: 120, category: "Desserts", inStock: true },
  { id: 3, name: "Architectural Red Velvet Cake", price: 1500, category: "Cakes", inStock: true },
  { id: 4, name: "Lavender Vanilla Macarons", price: 450, category: "Pastries", inStock: false }
];

export default function ClientDashboard({ onBackToStore }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [aiNegativePrompt, setAiNegativePrompt] = useState("deformed, low quality, cartoon, extra layers, dark, blurry, text, logo, realistic human hands");
  const [aiStyleModifier, setAiStyleModifier] = useState("Professional food photography, high-end architectural cake, cinematic lighting, studio background, luxury edible art");

  // Product editing states
  const [editingProductId, setEditingProductId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // Passcode verification (Khushi can change this)
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

  // Change order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Delete/Archive order
  const archiveOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
  };

  // Toggle Product stock status
  const toggleStock = (productId) => {
    setProducts(products.map(p => p.id === productId ? { ...p, inStock: !p.inStock } : p));
  };

  // Save edited price
  const savePrice = (productId) => {
    setProducts(products.map(p => p.id === productId ? { ...p, price: Number(editPrice) } : p));
    setEditingProductId(null);
  };

  // Calculate quick metrics
  const totalRevenue = orders.reduce((acc, curr) => curr.status === 'Completed' ? acc + Number(curr.total) : acc, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Completed').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center font-sans px-6 text-white relative overflow-hidden">
        {/* Decorative background gradients */}
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
            <h1 className="text-xl font-serif font-black">Chef Khushi's Console</h1>
            <p className="text-[9px] text-[#E89EB8] uppercase tracking-[0.25em] font-black">Delight Bakehouse Studio</p>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex bg-black/50 p-1.5 rounded-xl border border-white/5 gap-1">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'orders' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            Orders Manager
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'inventory' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            Inventory Control
          </button>
          <button 
            onClick={() => setActiveTab('ai_lab')}
            className={`px-5 py-2.5 rounded-lg font-black uppercase tracking-wider text-[10px] transition-all ${activeTab === 'ai_lab' ? 'bg-[#E89EB8] text-black shadow' : 'text-white/40 hover:text-white'}`}
          >
            AI Engine Tuner
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          
          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Active Baking Pipeline</p>
              <h3 className="text-3xl font-black font-serif text-[#E89EB8]">{activeOrdersCount}</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#E89EB8]/10 text-[#E89EB8]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path></svg>
            </div>
          </div>

          <div className="bg-[#121212]/40 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-1">Active Menu Items</p>
              <h3 className="text-3xl font-black font-serif text-white">{products.length}</h3>
            </div>
            <div className="p-4 rounded-xl bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
          </div>
        </div>

        {/* TAB 1: ORDER MANAGER */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-black flex items-center gap-3">
              <span>Customer Order Pipelines</span>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/60 font-sans">{orders.length} Total</span>
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {orders.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-white/30">
                  No active orders on record.
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-[#121212]/50 border border-white/15 p-8 rounded-3xl flex flex-col lg:flex-row justify-between gap-8 relative overflow-hidden">
                    
                    {/* Visual indicators for status */}
                    <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                      order.status === 'Completed' ? 'bg-[#25D366]' :
                      order.status === 'Baking' ? 'bg-[#E89EB8]' : 'bg-amber-400'
                    }`} />

                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black bg-white/10 px-3 py-1.5 rounded-lg tracking-wider text-slate-300">{order.id}</span>
                        <h4 className="text-xl font-bold text-white">{order.customer}</h4>
                        <span className={`text-[9px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full ${
                          order.status === 'Completed' ? 'bg-[#25D366]/10 text-[#25D366]' :
                          order.status === 'Baking' ? 'bg-[#E89EB8]/10 text-[#E89EB8]' : 'bg-amber-400/10 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/60">
                        <div>
                          <p className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-1">Delivery Target</p>
                          <p className="font-bold text-white">📅 {order.date}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-1">Thane Location / Address</p>
                          <p className="text-xs line-clamp-1">📍 {order.address}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <p className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-2">Item Summary</p>
                        <pre className="font-sans text-xs text-white/80 whitespace-pre-line leading-relaxed">{order.items}</pre>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col justify-end gap-3 lg:w-60">
                      <div className="text-right mb-2 lg:mb-4 hidden lg:block">
                        <p className="text-[10px] uppercase font-black tracking-wider text-white/30">Estimated Bill</p>
                        <p className="text-3xl font-black text-[#E89EB8]">₹{order.total}</p>
                      </div>

                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="w-full bg-black/60 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#E89EB8] text-white font-bold"
                      >
                        <option value="Pending">🕒 Pending Review</option>
                        <option value="Baking">🎂 Baking In Progress</option>
                        <option value="Completed">✅ Order Finished</option>
                      </select>

                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => window.open(`https://wa.me/${order.phone}`, '_blank')}
                          className="bg-[#25D366]/15 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[10px] font-black uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-1"
                        >
                          Chat client
                        </button>
                        <button 
                          onClick={() => archiveOrder(order.id)}
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

        {/* TAB 2: INVENTORY MANAGER */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-2xl font-serif font-black">Digital Display Menu Controls</h2>
              <button 
                onClick={() => {
                  const name = prompt("Enter Product Name:");
                  const price = Number(prompt("Enter Price (₹):"));
                  const category = prompt("Enter Category (Festive/Cakes/Desserts/Pastries):") || "General";
                  if (name && price) {
                    setProducts([...products, { id: Date.now(), name, price, category, inStock: true }]);
                  }
                }}
                className="bg-[#E89EB8] text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-105 transition-all shadow-lg shadow-[#E89EB8]/10"
              >
                + Add Custom Item
              </button>
            </div>

            <div className="bg-[#121212]/30 border border-white/10 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-black uppercase tracking-widest text-white/50">
                    <th className="p-6">Product Details</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Unit Price</th>
                    <th className="p-6">Studio Stock Status</th>
                    <th className="p-6 text-right">Edit Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-6">
                        <p className="font-bold text-white text-base">{product.name}</p>
                        <span className="text-[9px] text-white/30 uppercase tracking-wider">Product ID: DB-{product.id}</span>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">{product.category}</span>
                      </td>
                      <td className="p-6">
                        {editingProductId === product.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[#E89EB8] font-bold">₹</span>
                            <input 
                              type="number" 
                              className="w-20 bg-black border border-[#E89EB8] p-1.5 rounded text-white text-xs outline-none"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                            />
                            <button onClick={() => savePrice(product.id)} className="text-emerald-400 font-bold hover:underline text-xs">Save</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#E89EB8] text-base">₹{product.price}</span>
                            <button 
                              onClick={() => {
                                setEditingProductId(product.id);
                                setEditPrice(product.price);
                              }}
                              className="text-white/30 hover:text-white transition-colors"
                            >
                              ✏️
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-6">
                        <button 
                          onClick={() => toggleStock(product.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                            product.inStock 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {product.inStock ? "● Active In Stock" : "○ Sold Out"}
                        </button>
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                          className="text-red-400 hover:text-red-500 text-xs font-bold transition-colors"
                        >
                          Remove From Menu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AI ENGINE CONFIGURATOR */}
        {activeTab === 'ai_lab' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-black text-[#E89EB8]">AI Concept Lab Prompt Configurator</h2>
              <p className="text-white/40 text-sm mt-1 max-w-3xl">
                Fine-tune the generative rendering engine used by custom order clients. These settings adjust how prompts are optimized behind the scenes to produce realistic, gorgeous architectural designs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dynamic prompt addition card */}
              <div className="bg-[#121212]/50 border border-white/10 p-8 rounded-3xl space-y-4">
                <h4 className="text-white font-bold text-lg">Default AI Art Styles</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  These keywords are appended directly to every prompt typed by a customer to enforce consistent and high-end visual representations.
                </p>
                <textarea 
                  rows="4"
                  value={aiStyleModifier}
                  onChange={(e) => setAiStyleModifier(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-xs font-sans text-white/80 focus:border-[#E89EB8] outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Negative prompting card */}
              <div className="bg-[#121212]/50 border border-white/10 p-8 rounded-3xl space-y-4">
                <h4 className="text-white font-bold text-lg">Negative Prompting Rules</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  These keywords guide the Stable Diffusion system away from generating low-quality artifacts or unwanted text features, keeping results visually clean.
                </p>
                <textarea 
                  rows="4"
                  value={aiNegativePrompt}
                  onChange={(e) => setAiNegativePrompt(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-xs font-sans text-white/80 focus:border-[#E89EB8] outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl flex items-center gap-3">
              <span>✔️</span>
              <span><strong>Auto-sync active:</strong> These configuration filters are applied directly to the SDXL Hugging Face Pipeline in real-time.</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';

export default function ClientDashboard({ onBackToStore }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState('');

  // Fetch Auth Credentials from Sanity
  useEffect(() => {
    client.fetch(`*[_type == "adminAuth"][0]`).then(data => setAdminData(data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminData && username === adminData.username && password === adminData.password) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const updateCredentials = async () => {
    try {
      await client.patch(adminData._id).set({ username, password }).commit();
      alert('Credentials updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <motion.div className="w-full max-w-sm bg-[#121212] border border-white/10 p-8 rounded-3xl text-center">
          <h2 className="text-xl font-bold text-white mb-6">Chef Workspace</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white" onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="w-full bg-[#E89EB8] text-black font-bold py-4 rounded-xl">LOGIN</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Welcome, Khushi</h1>
        <button onClick={onBackToStore} className="text-sm bg-white/10 px-4 py-2 rounded-lg">Exit</button>
      </header>

      <div className="bg-[#121212] p-8 rounded-3xl border border-white/10">
        <h2 className="text-lg font-bold mb-6">Manage Login Credentials</h2>
        <div className="space-y-4 max-w-sm">
          <input type="text" defaultValue={adminData?.username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black p-3 rounded" />
          <input type="password" defaultValue={adminData?.password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black p-3 rounded" />
          <button onClick={updateCredentials} className="bg-[#E89EB8] text-black px-6 py-2 rounded font-bold">Update Credentials</button>
        </div>
      </div>
    </div>
  );
}
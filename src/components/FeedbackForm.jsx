import React, { useState } from 'react';
import { moderateFeedback } from '../lib/aiModerator';
import { client } from '../lib/sanity'; // Ensure your client has write token enabled

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // 1. Run Generative AI Moderation
    const aiResult = await moderateFeedback(formData.comment);

    if (aiResult.status === "REJECTED") {
      setStatus('error');
      alert(`Sorry! Your review was flagged: ${aiResult.reason}`);
      return;
    }

    // 2. Prepare for Sanity
    const doc = {
      _type: 'feedback',
      name: formData.name,
      rating: Number(formData.rating),
      comment: formData.comment,
      isApproved: aiResult.status === "APPROVED", // Auto-approve if AI says it's genuine
      aiFlaggedReason: aiResult.reason,
      createdAt: new Date().toISOString(),
    };

    try {
      await client.create(doc);
      setStatus('success');
      setFormData({ name: '', rating: 5, comment: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border-2 border-pink-100">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Leave a Review for Khushi 🍰</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border rounded-lg" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required 
        />
        <select 
          className="w-full p-2 border rounded-lg"
          value={formData.rating}
          onChange={(e) => setFormData({...formData, rating: e.target.value})}
        >
          {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
        </select>
        <textarea 
          className="w-full p-2 border rounded-lg" 
          placeholder="How were the brownies?"
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
          required
        />
        <button 
          type="submit" 
          className="w-full bg-pink-500 text-white py-2 rounded-lg font-bold hover:bg-pink-600 transition"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'AI is checking...' : 'Submit Review'}
        </button>
        {status === 'success' && <p className="text-green-500 text-center">Thanks! Review submitted.</p>}
      </form>
    </div>
  );
};

export default FeedbackForm;
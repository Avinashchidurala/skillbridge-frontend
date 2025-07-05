import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios';

function AdminBatchManager() {
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBatches = async () => {
    try {
      const res = await axiosClient.get('/api/admin/batches');
      setBatches(res.data);
    } catch (err) {
      alert('Failed to load batches.');
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleAddBatch = async () => {
    if (!newBatch.trim()) return;
    setLoading(true);
    try {
      await axiosClient.post('/api/admin/batches', { name: newBatch });
      setNewBatch('');
      fetchBatches();
    } catch (err) {
      alert('Failed to add batch.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this batch?')) return;
    try {
      await axiosClient.delete(`/api/admin/batches/${id}`);
      fetchBatches();
    } catch (err) {
      alert('Failed to delete batch.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Batches</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="New batch name"
          value={newBatch}
          onChange={(e) => setNewBatch(e.target.value)}
        />
        <button
          onClick={handleAddBatch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Adding...' : 'Add Batch'}
        </button>
      </div>

      <ul>
        {batches.map((batch) => (
          <li key={batch.id} className="flex justify-between items-center border p-3 mb-2 rounded bg-gray-50">
            <span>{batch.name}</span>
            <button
              onClick={() => handleDelete(batch.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminBatchManager;

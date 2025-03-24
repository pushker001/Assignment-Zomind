import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { createTestSuite } from '../redux/actions/Testsuiteaction';
import { useNavigate } from 'react-router-dom';
export const Testsuiteform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(createTestSuite({ name: title, description }));
      setTitle('');
      setDescription('');
      navigate("/suites")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Test Suite</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          placeholder="Suite Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          placeholder="Suite Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add Suite
      </button>
    </form>
  );
};



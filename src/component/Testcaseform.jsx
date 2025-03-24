import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { createTestCase } from '../redux/actions/Testcaseaction';

export const Testcaseform = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending');
  

  const handlesubmit = (e) => {
    e.preventDefault();

    const newTestCase = {
      name: title,
      description,
      priority,
      status,
      
    };

    dispatch(createTestCase(newTestCase));

    // Clear the form
    setTitle('');
    setDescription('');
    setPriority('Low');
    setStatus('Pending');
    

    // Navigate back to the test case list after adding
    navigate('/');


  }




  return (
    <div className='max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg'>
         <h2 className="text-2xl font-bold mb-6">Create New Test Case</h2>

         <form onSubmit={handlesubmit} className="space-y-6">
        {/* Title */}
            <div>
              <label className="block text-sm font-medium">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md px-4 py-2 mt-1"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md px-4 py-2 mt-1"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border rounded-md px-4 py-2 mt-1"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Execution Status */}
            <div>
              <label className="block text-sm font-medium">Execution Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md px-4 py-2 mt-1"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

              {/* Submit Button */}
              <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create Test Case
              </button>
            </div>
       </form>

      </div>
  )
}

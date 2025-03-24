import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchTestSuites, removeTestSuite } from '../redux/actions/Testsuiteaction';
import {Link } from 'react-router-dom'
export const Testsuitelist = () => {

  const dispatch = useDispatch();
  const testsuite = useSelector((state) => state.testSuites.list)

  useEffect(() => {
    dispatch(fetchTestSuites());
  },[dispatch])


  const HandleDelete = async(id) => {
    const confirmDelete = window.confirm("are you sure want to delete this suite?")
    if(confirmDelete){
      dispatch(removeTestSuite(id));
    }
  }



  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className='flex justify-between items-center mb-6'>
        <h2 className="text-2xl font-bold">Test Suites</h2>
  
      </div>
      {testsuite.length === 0 ? (
        <p className='text-gray-500'> No test suites found </p>
      ): (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {testsuite.map((suite) => {
            return (
              <div key={suite.id}
              className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300'
              >
                <h3 className='text-xl font-semibold mb-2'>{suite.name}</h3>
                <p className="text-gray-600 mb-4">
                  {suite.description || 'No description provided.'}
                </p>

                <div className="flex justify-end mt-4">
                

                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => HandleDelete(suite.id)}
                >
                  Delete
                </button>
              </div>

              </div>
            )
          })}

        </div>
      )}
    </div>
  )
}


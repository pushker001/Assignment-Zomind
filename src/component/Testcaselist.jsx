import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestCases, filterCases, removeTestCase } from '../redux/actions/Testcaseaction';

export const Testcaselist = () => {
  const dispatch = useDispatch();

  // State from Redux
  const allTestCases = useSelector((state) => state.testCases.list);        // All test cases
  const filteredTestCases = useSelector((state) => state.testCases.filteredList);  // Filtered cases
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 6;

  useEffect(() => {
    dispatch(fetchTestCases());
  }, [dispatch]);

  // Use filtered cases if search is applied, otherwise use all cases
  const casesToDisplay = searchQuery ? filteredTestCases : allTestCases;

  // Pagination logic
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = casesToDisplay.slice(indexOfFirstCase, indexOfLastCase);

  const totalPages = Math.ceil(casesToDisplay.length / casesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(filterCases(query));
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  return (
    <div className="p-4">
      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, description, or status..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Test Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCases.length > 0 ? (
          currentCases.map((testCase) => (
            <div key={testCase.id} className="bg-gray-300 shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold">{testCase.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{testCase.description}</p>
              <p className="text-sm font-semibold">Priority: {testCase.priority}</p>
              <p className="text-sm font-semibold">Status: {testCase.status}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => dispatch(removeTestCase(testCase.id))}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No test cases found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {casesToDisplay.length > casesPerPage && (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => paginate(page + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === page + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

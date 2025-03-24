import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Testcaseform } from './component/Testcaseform';
import { Testcaselist } from './component/Testcaselist';
import { Testsuiteform } from './component/Testsuiteform';
import { Testsuitelist } from './component/Testsuitelist';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-5xl mx-auto">
            
            {/* Navbar */}
            <nav className="flex justify-between items-center mb-8">
              <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
                Test Cases
              </Link>
              <Link to="/suites" className="text-xl font-bold text-green-600 hover:text-green-800">
                Test Suites
              </Link>
            </nav>

            <Routes>
              {/* Test Case Route */}
              <Route
                path="/"
                element={
                  <div>
                    <div className="flex justify-end mb-4">
                      {/* Button to navigate to Create Test Case */}
                      <Link to="/createcase">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                          Create New Test Case
                        </button>
                      </Link>
                    </div>
                    <Testcaselist />
                  </div>
                }
              />

              <Route path="/createcase" element={<Testcaseform />} />

              {/* Test Suite Route */}
              <Route
                path="/suites"
                element={
                  <div>
                    <div className="flex justify-end mb-4">
                      {/* ✅ Button to navigate to Create Test Suite */}
                      <Link to="/suites/create">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                          Create New Test Suite
                        </button>
                      </Link>
                    </div>
                    <Testsuitelist />
                  </div>
                }
              />

              {/* ✅ Add route for the Create Test Suite Form */}
              <Route path="/suites/create" element={<Testsuiteform />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

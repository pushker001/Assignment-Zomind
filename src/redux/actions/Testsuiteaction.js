import axios from 'axios';
import { setTestSuites, addTestSuite, deleteTestSuite, updateTestSuite } from '../slices/Testsuiteslice';

// MockAPI endpoint
const API_URL = "https://67de383b471aaaa742839da0.mockapi.io/testsuite"

// Fetch all suites
export const fetchTestSuites = () => async (dispatch) => {
  try {
    const res = await axios.get(API_URL);
    dispatch(setTestSuites(res.data));
  } catch (error) {
    console.error('Failed to fetch test suites:', error);
  }
};

// Create a new suite
export const createTestSuite = (suite) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL, suite);
    dispatch(addTestSuite(res.data));
  } catch (error) {
    console.error('Failed to create test suite:', error);
  }
};

// Delete a suite
export const removeTestSuite = (id) => async (dispatch) => {
  try {
    const deleteUrl = `${API_URL}/${id}`;
    console.log(`Deleting the suite at: ${deleteUrl}`);  // ✅ Log the full URL

    await axios.delete(deleteUrl);  // Correct DELETE request
    dispatch(deleteTestSuite(id));  // Remove it from Redux store
  } catch (error) {
    console.error('Failed to delete test suite:', error);
  }
};
// Update a suite
export const editTestSuite = (suite) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/${suite.id}`, suite);
    dispatch(updateTestSuite(res.data));
  } catch (error) {
    console.error('Failed to update test suite:', error);
  }
};

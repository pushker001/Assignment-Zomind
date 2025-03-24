import axios from 'axios';
import { addTestCase, deleteTestCase, filterTestCases, setTestCases, updateTestCase } from '../slices/Testcaseslice';


const API_URL = 'https://67de383b471aaaa742839da0.mockapi.io/testcase';

export const fetchTestCases = () => async (dispatch) => {
  const res = await axios.get(API_URL);
  dispatch(setTestCases(res.data));
};

export const filterCases = (query) => (dispatch) => {
  dispatch(filterTestCases({ searchQuery: query }));
};

export const createTestCase = (testCase) => async (dispatch) => {
  const res = await axios.post(API_URL, testCase);
  dispatch(addTestCase(res.data));
};

export const removeTestCase = (id) => async (dispatch) => {
  try {
    if (!id) {
      console.error('Invalid ID:', id);
      return;
    }

    const response = await axios.delete(`${API_URL}/${id}`);

    if (response.status === 200 || response.status === 204) {
      // Only dispatch the action if the API successfully deletes the case
      dispatch(deleteTestCase(id));
    } else {
      console.error('Failed to delete. Status:', response.status);
    }
  } catch (error) {
    console.error('Error deleting test case:', error);
    alert('Failed to delete test case. It may not exist.');
  }
}

export const editTestCase = (testCase) => async (dispatch) => {
  const res = await axios.put(`${API_URL}/${testCase.id}`, testCase);
  dispatch(updateTestCase(res.data));
}




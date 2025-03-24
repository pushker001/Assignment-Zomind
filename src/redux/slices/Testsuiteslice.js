import { createSlice } from '@reduxjs/toolkit';

const Testsuiteslice = createSlice({
  name: 'testSuites',
  initialState: { list: [], status: 'idle' },
  reducers: {
    setTestSuites: (state, action) => {
      state.list = action.payload;
    },
    addTestSuite: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTestSuite: (state, action) => {
      state.list = state.list.filter(suite => suite.id !== action.payload);
    },
    updateTestSuite: (state, action) => {
      const index = state.list.findIndex(suite => suite.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    }
  }
});

export const { setTestSuites, addTestSuite, deleteTestSuite, updateTestSuite } = Testsuiteslice.actions;
export default Testsuiteslice.reducer;

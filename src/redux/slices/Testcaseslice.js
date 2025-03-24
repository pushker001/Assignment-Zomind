import { createSlice } from '@reduxjs/toolkit';

const Testcaseslice = createSlice({
  name: 'testCases',
  initialState: { list: [], filteredList: [] },
  reducers: {
    setTestCases: (state, action) => {
      state.list = action.payload;
      state.filteredList = action.payload;
    },
    addTestCase: (state, action) => {
      state.list.push(action.payload);
      state.filteredList.push(action.payload)
    },
    deleteTestCase: (state, action) => {
      state.list = state.list.filter(tc => tc.id !== action.payload);
      state.filteredList = state.filteredList.filter(tc => tc.id !== action.payload);
    },
    updateTestCase: (state, action) => {
      const index = state.list.findIndex(tc => tc.id === action.payload.id);
      if (index !== -1){
        state.list[index] = action.payload;
        state.filteredList[index] = action.payload;

      }
    },

    filterTestCases: (state, action) => {
      const { searchQuery } = action.payload;
      
      if (!searchQuery) {
        state.filteredList = state.list;  // Show all if query is empty
        return;
      }

      const lowerCaseQuery = searchQuery.toLowerCase();

      state.filteredList = state.list.filter(tc =>
        tc?.name?.toLowerCase().includes(lowerCaseQuery) ||
        tc?.description?.toLowerCase().includes(lowerCaseQuery) ||
        tc?.status?.toLowerCase().includes(lowerCaseQuery)
      );
    },

  }
});

export const { setTestCases, addTestCase, deleteTestCase, updateTestCase, filterTestCases } = Testcaseslice.actions;
export default Testcaseslice.reducer;

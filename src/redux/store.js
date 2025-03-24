import { configureStore } from '@reduxjs/toolkit';
import Testcaseslice from './slices/Testcaseslice';
import Testsuiteslice from './slices/Testsuiteslice';





const store = configureStore({
    reducer: {
        testCases: Testcaseslice,
        testSuites: Testsuiteslice
    }
})

export default store;
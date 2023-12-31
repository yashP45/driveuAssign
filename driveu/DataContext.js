// DataContext.js
import React, { createContext, useContext, useReducer } from 'react';

const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload;
    case 'ADD_DATA':
      return [...state, action.payload];
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, []);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useData };

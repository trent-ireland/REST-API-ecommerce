import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import store from './Redux/Store'; // Import your Redux store
import App from './App'; // Your main App component

const root = createRoot(document.getElementById('root')); // Find the root HTML element by its ID

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from "react-redux";
import CartProvider from './contexts/CartContext';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <CartProvider> 
      <App />
    </CartProvider>
  </Provider>
</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

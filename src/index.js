import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FetchData } from './Home/FetchData';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Cartcontext from './Home/Home/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <BrowserRouter>
     <FetchData>
      <Cartcontext>
      <App/>
      </Cartcontext>
    </FetchData>
    </BrowserRouter>
  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

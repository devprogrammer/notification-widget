import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('gamestop'));
const currElement = document.querySelector("mymanager-notification-widget")
if (!currElement) {
  const rootDiv = document.createElement("div")
  rootDiv.setAttribute("id", "mymanager-notification-widget")
} 

const root = ReactDOM.createRoot(document.getElementsById('mymanager-notification-widget'));
// const widgetDiv = document.querySelector('.mymanager-notification-widget');

root.render(
  <React.StrictMode>
    {/* <App symbol={widgetDiv?.dataset.symbol}/> */}
    <App />
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('gamestop'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const root = ReactDOM.createRoot(document.getElementById('gamestop'));
const widgetDiv = document.querySelector('.mymanager-notification-widget');

root.render(
  <React.StrictMode>
    <App symbol={widgetDiv?.dataset.symbol}/>
  </React.StrictMode>
);

// // Find all widget divs
// const widgetDivs = document.querySelector('.mymanager-notification-widget');

// // Inject our React App into each class
// widgetDivs.forEach(div => {
//     ReactDOM.render(
//       <React.StrictMode>
//         <App symbol={div.dataset.symbol}/>
//       </React.StrictMode>,
//         div
//     );
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

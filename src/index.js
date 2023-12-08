import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

(function() {
  // the DOM will be available here
  ReactDOM.render(<App />,         
  document.body.appendChild(document.createElement("div")));
})();

// const root = ReactDOM.createRoot(document.getElementById('gamestop'));

// root.render(
//   <React.StrictMode>
//     {/* <App symbol={widgetDiv?.dataset.symbol}/> */}
//       <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

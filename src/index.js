import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

// const express = require('express');
// const path = require('path');
// const app = express()
// const publicPath = path.join(__dirname,'..','public');
// const PORT = process.env.PORT || 3000;

// app.use(express.static(publicPath));

// app.get("*", (req,res) => {
//   res.sendFile(path.join(publicPath,'index.html'))
// })

// app.listen(PORT,()=>{
//   console.log('Server is up!')
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

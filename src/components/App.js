import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../routes/Home';
import ShowDetail from '../components/ShowDetail';
//
const App = () => {
  // test branch

  return (
    <Router>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/:id" exact={true} component={ShowDetail}></Route>
    </Router>
  );
};

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;

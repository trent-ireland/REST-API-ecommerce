import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Products from './Components/Products/Products.js'; 
import Home from './Components/Home/Home.jsx';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Products" component={Products} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

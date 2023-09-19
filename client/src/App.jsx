import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Products from './Components/Products/Products'; 
import Home from './Components/Home/Home.jsx';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

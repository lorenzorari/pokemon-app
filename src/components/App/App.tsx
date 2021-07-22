import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../pages/home';
import PokemonDetails from '../../pages/pokemon-details';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/details">
            <PokemonDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

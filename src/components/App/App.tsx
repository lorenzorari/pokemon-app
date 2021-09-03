import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../pages/home';
import PokemonDetails from '../../pages/pokemon-details';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pokemon/:id" component={PokemonDetails} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../../pages/home';
import PokemonDetails from '../../pages/pokemon-details';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pokedex/:id" component={PokemonDetails} />
        <Route exact strict path="/pokedex" component={Home} />
        <Redirect from="/" to="/pokedex" />
      </Switch>
    </Router>
  );
}

export default App;

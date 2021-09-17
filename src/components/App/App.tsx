import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from 'src/pages/home';
import DetailsPage from 'src/pages/details';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pokemon/:id" component={DetailsPage} />
        <Route exact path="/" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;

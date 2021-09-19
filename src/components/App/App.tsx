import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from 'src/pages/home';
import DetailsPage from 'src/pages/details';
import NotFoundPage from 'src/pages/404';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pokemon/:id" component={DetailsPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;

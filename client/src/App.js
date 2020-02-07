import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SignIn from './containers/SignIn';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/sign_in' component={SignIn}/>
      </Switch>
    </Router>
  )
}

export default App;

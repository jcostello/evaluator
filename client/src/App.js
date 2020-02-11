import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd'

import PrivateRoute from './components/PrivateRoute'
import SignIn from './containers/SignIn';
import Home from './containers/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/sign_in' component={SignIn}/>
        <PrivateRoute path='/'>
          <Home/>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App;

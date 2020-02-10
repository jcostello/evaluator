import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd'

import SignIn from './containers/SignIn';

function App() {
  return (
    <Layout style={{height: '100%'}}>
      <Layout.Content style={{height: '100%'}}>
        <Router>
          <Switch>
            <Route path='/sign_in' component={SignIn}/>
          </Switch>
        </Router>
      </Layout.Content>
    </Layout>
  )
}

export default App;

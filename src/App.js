import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import FrontPage from './containers/FrontPage/FrontPage';
import Favorites from './containers/Favorites/Favorites';
import Backdrop from './components/UI/Backdrop/Backdrop';

function App() {

  let routes = (
    <Switch>
      <Route exact path='/favorites' component={Favorites} />
      <Route exact path='/' component={FrontPage} />
      <Redirect to='/' />
    </Switch>
  );

  return (
      <div className='App'>
        <Backdrop />
        <Layout>{routes}</Layout>
      </div>
  );
}

export default App;

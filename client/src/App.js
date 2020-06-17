import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
const App = ()=> {
  return (
    <Router>
    <Fragment>
      <Navbar />
      <div className = 'container'>
        <Switch>
        <Route exact path ='/' component = {Home}/>
        <Route path ='/about' exact copmonent={About}/>
        </Switch>
    </div>
    </Fragment>
    </Router>
  );
}

export default App;

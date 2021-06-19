import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BlockTable from '../BlockTable/BlockTable';
import Home from '../Home/Home';
import React from 'react';
import {Typography} from '@material-ui/core';


function App() {
  return (

          <div className="App">
          <div className="App-header">
            <Typography variant="h2">BlockChainExplorer</Typography>
          </div>
          <div className="App-nav">
            <Router>
              <div>
                <Link to="/">Home</Link>
                <Link to="/blocktable">BlockTable</Link>
                <Route exact path="/" component={Home}/>
                <Route exact path="/blocktable" render={() => (
                <h3>Please select a blockHash.</h3>
                  )}/>
                <Route path="/blocktable/:blockHash" component={BlockTable}/>
              </div>
            </Router>
          </div>
            
        </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import BlockTable from '../BlockTable/BlockTable';
import Home from '../Home/Home';
import React from 'react';
import { Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import logo from './etherlogo.gif'


function App() {

  return (

    <div className="App">
      <div className="App-header">
        <div>
          <img className="App-logo" src={logo} alt="Ether logo" /><br />
        </div>
        <div>
          <Typography variant="h1">BlockChain Explorer</Typography>
          <Fade in={true} >
          <Typography variant="h2">Scroll Down to start exploring</Typography>
          </Fade>
        </div>
      </div>
      <div className="App-nav">
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/blocktable" render={() => (
              <h3>Please select a blockHash.</h3>
            )} />
            <Route path="/blocktable/:blockHash" component={BlockTable} />
          </div>
        </Router>
      </div>

    </div>
  );
}

export default App;

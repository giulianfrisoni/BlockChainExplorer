import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import App from '../BlockBrowse/BlockBrowse';
import BlockBrowse from '../BlockBrowse/BlockBrowse';
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ef64c86f37a84cc9a7929ba567d8138d'));

class Home extends Component {
    render() {
        return (
            <BlockBrowse></BlockBrowse>
        );
    }
}

export default Home;
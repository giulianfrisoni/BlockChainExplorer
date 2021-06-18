import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            block_transactions: [],
            block_miner: [],
            block_dificulty: [],
            curr_block_no: null
        }
    }
    getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_trans = this.state.block_transactions.slice();
        const block_author = this.state.block_miner.slice();
        const block_mining = this.state.block_dificulty.slice();
        var max_blocks = 10;
        if (curr_block_no < max_blocks) max_blocks = curr_block_no;
        for (var i = 0; i < max_blocks; i++, curr_block_no--) {
            var currBlockObj = web3.eth.getBlock(curr_block_no);
            block_ids.push(currBlockObj.number);
            block_trans.push(web3.eth.getBlockTransactionCount(currBlockObj.number));
            block_author.push(currBlockObj.miner);
            block_mining.push(parseInt(currBlockObj.difficulty));
        }
        this.setState({
            block_ids: block_ids,
            block_transactions: block_trans,
            block_miner: block_author,
            block_dificulty: block_mining,


        })
    }
    componentWillMount() {
        this.curr_block_no = web3.eth.blockNumber;
        this.getBlocks(this.curr_block_no);
    }
    render() {
        var tableRows = [];
        _.each(this.state.block_ids, (value, index) => {
            tableRows.push(
                <tr key={this.state.block_ids[index]}>
                    <td className="tdCenter">{this.state.block_ids[index]}</td>
                    <td><Link to={`/blocktable/${this.state.block_ids[index]}`}>{this.state.block_ids[index]}</Link></td>
                </tr>
            )
        });
        return (

            <div className="Home">
                <h2>Home page</h2>
                Current Block: {this.curr_block_no}
                <table>
                    <thead><tr>
                        <th>Block No</th>
                        <th>Transactions</th>
                        <th>Author</th>
                        <th>Mining Difficulty</th>
                    </tr></thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;
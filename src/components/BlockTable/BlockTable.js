import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ef64c86f37a84cc9a7929ba567d8138d'));

class BlockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocktable: [],
      block_hash: props.match.params.blockHash
      }
    }
    componentWillMount() {
      this.block_hash = this.props.match.params.blockHash
      this.getBlockState(this.block_hash);
    }
    getBlockState(block_hid) {
      console.log("Block hash: " + this.block_hash);
      var currBlockObj = web3.eth.getBlock(this.block_hash);
      console.log(JSON.stringify(currBlockObj));
      // Set the Component state
      this.setState({
        block_id: currBlockObj.number,
        block_hid: currBlockObj.hash,
        block_ts: Date(parseInt(this.state.blocktable.timestamp, 10)).toString(),
        block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
        block: currBlockObj
      })
    }


    componentWillReceiveProps(nextProps) {
      var block_hash_old = this.props.match.params.blockHash;
      var block_hash_new = nextProps.match.params.blockHash;
      // compare old and new URL parameter (block hash)
      // if different, reload state using web3
      if (block_hash_old !== block_hash_new)
      this.getBlockState(block_hash_new);
    }
  render() {
      const block = this.state.block;
      const difficulty = parseInt(block.difficulty, 10);
      const difficultyTotal = parseInt(block.totalDifficulty, 10);
      return (
        <div className="Block">
          <h2>Block Info</h2>
          <div>
            <table>
              <tbody>
                <tr><td className="tdLabel">Height: </td><td>{this.state.block.number}</td></tr>
                <tr><td className="tdLabel">Timestamp: </td><td>{this.state.block_ts}</td></tr>
                <tr><td className="tdLabel">Transactions: </td><td>{this.state.block_txs}</td></tr>
                <tr><td className="tdLabel">Hash: </td><td>{this.state.block.hash}</td></tr>
                <tr><td className="tdLabel">Parent hash: </td>
                  <td><Link to={`../block/${this.state.block.parentHash}`}>{this.state.block.parentHash}</Link></td></tr>
                <tr><td className="tdLabel">Nonce: </td><td>{this.state.block.nonce}</td></tr>
                <tr><td className="tdLabel">Size: </td><td>{this.state.block.size} bytes</td></tr>
                <tr><td className="tdLabel">Difficulty: </td><td>{difficulty}</td></tr>
                <tr><td className="tdLabel">Difficulty: </td><td>{difficultyTotal}</td></tr>
                <tr><td className="tdLabel">Gas Limit: </td><td>{block.gasLimit}</td></tr>
                <tr><td className="tdLabel">Gas Used: </td><td>{block.gasUsed}</td></tr>
                <tr><td className="tdLabel">Sha3Uncles: </td><td>{block.sha3Uncles}</td></tr>
                <tr><td className="tdLabel">Extra data: </td><td>{this.state.block.extraData}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}
export default BlockTable;
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import Web3 from 'web3';
/* INFURA NODE */
/* var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ef64c86f37a84cc9a7929ba567d8138d')); */
/* GANACHE LOCAL NODE */
var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

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
    var currBlockObj = web3.eth.getBlock(this.block_hash);
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
    return (
      <div className="Block">
        <Grid container spacing={5}

          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h2">Viewing Block {block.number} Data</Typography>
              <TableContainer >
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Block Hash</TableCell>
                      <TableCell align="left" >Timestamp</TableCell>
                      <TableCell align="left">Transactions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={this.state.block.hash} >
                      <TableCell >{this.state.block.hash}</TableCell>
                      <TableCell align="left">{this.state.block_ts}</TableCell>
                      <TableCell align="left">{this.state.block_txs}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Paper>
            <Grid item xs={12}>
              <Button size="large" variant="contained" color="black" component={Link} to={`/`}>
                Go Back
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}
export default BlockTable;
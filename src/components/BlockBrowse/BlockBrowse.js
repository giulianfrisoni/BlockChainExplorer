import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ef64c86f37a84cc9a7929ba567d8138d'));

class BlockBrowse extends Component {
    refreshinterval;
    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            block_hids: [],
            block_transactions: [],
            block_miner: [],
            block_dificulty: [],
            curr_block_no: null,
            block_data: []
        }
    }
    getBlocks(curr_block_no) {
        this.curr_block_no = web3.eth.blockNumber;
        const block_idno = this.state.block_ids.slice();
        const block_hashid = this.state.block_hids.slice();
        const block_trans = this.state.block_transactions.slice();
        const block_author = this.state.block_miner.slice();
        const block_mining = this.state.block_dificulty.slice();
        const block_datainfo = this.state.block_data.slice();
        var max_blocks = 10;
        if (this.curr_block_no < max_blocks) max_blocks = curr_block_no;
        for (var i = 0; i < max_blocks; i++, this.curr_block_no--) {
            var currBlockObj = web3.eth.getBlock(this.curr_block_no);
            if (block_idno.indexOf(currBlockObj.number) === -1) {
                block_idno.push(currBlockObj.number);
                block_hashid.push(web3.eth.getBlock(currBlockObj.number).hash);
                block_trans.push(web3.eth.getBlockTransactionCount(currBlockObj.number));
                block_author.push(currBlockObj.miner);
                block_mining.push(parseInt(currBlockObj.difficulty));
                block_datainfo.push({
                    key: currBlockObj.number,
                    transno: web3.eth.getBlockTransactionCount(currBlockObj.number),
                    miner: currBlockObj.miner,
                    difficulty: parseInt(currBlockObj.difficulty),
                    hash: parseInt(web3.eth.getBlock(currBlockObj.number).hash)
                })
                console.log(block_datainfo);
            }
        }
        this.setState({
            block_ids: block_idno,
            block_hids: block_hashid,
            block_transactions: block_trans,
            block_miner: block_author,
            block_dificulty: block_mining,
            block_data: block_datainfo

        })
    }
    componentDidMount() {
        this.getBlocks(this.curr_block_no);
        this.refreshinterval = setInterval(this.getBlocks.bind(this), 5000); // runs every 5 seconds.

    }
    componentWillUnmount() {
        clearInterval(this.getBlocks);
    }
    handleClick  (event, id) {
    
        console.log("row link" + id);
   }

    render() {
        const columns = [
            { id: 'key', label: 'Name', minWidth: 170 },
            { id: 'transno', label: 'ISO\u00a0Code', minWidth: 100 },
            { id: 'miner', label: 'Population', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US'), },
            { id: 'difficulty', label: 'Population', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US'), },
            { id: 'hash', label: 'Population', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US'), },
        ];


        return (
            <div className="Home">
                <Paper>
                    <Typography variant="h2">Home page</Typography>
                    <Typography>Current Block: {this.curr_block_no} </Typography>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Block #</TableCell>
                                    <TableCell align="right" sortDirection="desc" >Transaction #</TableCell>
                                    <TableCell align="right">Miner</TableCell>
                                    <TableCell align="right">Hash Difficulty</TableCell>
                                    <TableCell align="right" >Hash ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.block_data.map((row) => (
                                    <TableRow key={row.key}>
                                        <TableCell component="th" scope="row" onClick={() => this.handleClick(row.hash)}>
                                            {row.key}
                                        </TableCell>
                                        <TableCell align="right">{row.transno}</TableCell>
                                        <TableCell align="right">{row.miner}</TableCell>
                                        <TableCell align="right">{row.difficulty}</TableCell>
                                        <TableCell align="right">{row.hash}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    }
}

export default BlockBrowse;
import React, { Component } from 'react';
import Web3 from 'web3';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
/* INFURA NODE */
/* var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ef64c86f37a84cc9a7929ba567d8138d')); */
/* GANACHE LOCAL NODE */
var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

class BlockBrowse extends Component {
    refreshinterval;
    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            curr_block_no: web3.eth.blockNumber,
            block_data: [],
            button_state: {
                text: "Stop Refresh",
                color: "default",
            }
        }
    }
    getBlocks(block_no) {
        block_no = web3.eth.blockNumber;
        if (block_no !== "") {
            const block_idno = this.state.block_ids.slice();
            const block_datainfo = this.state.block_data.slice();
            var max_blocks = 10;
            if (block_no < max_blocks) max_blocks = block_no;
            for (var i = 0; i < max_blocks; i++, block_no--) {
                var currBlockObj = web3.eth.getBlock(block_no);
                if (block_idno.indexOf(currBlockObj.number) === -1) {
                    block_idno.push(currBlockObj.number);
                    block_datainfo.push({
                        key: currBlockObj.number,
                        transno: web3.eth.getBlockTransactionCount(currBlockObj.number),
                        miner: currBlockObj.miner,
                        difficulty: parseInt(currBlockObj.difficulty),
                        hash: (web3.eth.getBlock(currBlockObj.number).hash)
                    })
                    console.log(block_datainfo);
                }
            }
            this.setState({
                block_ids: block_idno,
                block_data: block_datainfo,
                curr_block_no: block_no
            })
        }
    }
    componentDidMount() {
        this.getBlocks(this.curr_block_no);
        this.refreshinterval = setInterval(this.getBlocks.bind(this), 5000); // runs every 5 seconds.

    }
    componentWillUnmount() {
        clearInterval(this.getBlocks);
    }
    handleClickRow(event, id) {

        console.log("row link" + id);
    }

    handleClickButton(event) {
        if (this.state.button_state.text === "Stop Refresh") {
            this.setState({
                button_state: {
                    text: "Start Refresh",
                }
            })

            clearInterval(this.getBlocks);
        } else {
            this.setState({
                button_state: {
                    text: "Stop Refresh",
                }
            })
            this.refreshinterval = setInterval(this.getBlocks.bind(this), 5000); // runs every 5 seconds.
        }
    }

    render() {
        return (
            <div className="Home">
                <Paper >
                    <Box alignItems="center">
                        <Typography variant="h2">Home page</Typography>
                    </Box>
                    <Box alignContent="flex-end">
                        <Button variant="contained" color={this.state.button_state.color} onClick={() => this.handleClickButton()}>
                            {this.state.button_state.text}
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer >
                            <Table size="medium" aria-label="a dense table">
                                <TableHead>

                                    <TableRow>
                                        <TableCell sortDirection="desc" >Block #</TableCell>
                                        <TableCell align="right"  >Transaction #</TableCell>
                                        <TableCell align="right">Miner</TableCell>
                                        <TableCell align="right">Hash Difficulty</TableCell>
                                        <TableCell align="right" >Hash ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.block_data.map((row) => (
                                        <TableRow key={row.key} >
                                            <TableCell component="th" scope="row" filtering="true" sorting="true" onClick={() => this.handleClickRow(row.hash)}>
                                                {row.key}
                                            </TableCell>
                                            <TableCell align="right">{row.transno}</TableCell>
                                            <TableCell align="right">{row.miner}</TableCell>
                                            <TableCell align="right">{row.difficulty}</TableCell>
                                            <TableCell align="right" component={Link} to={`/blocktable/${row.hash.toString()}/`} key={row.key} >{row.hash}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </div>
        );
    }
}

export default BlockBrowse;
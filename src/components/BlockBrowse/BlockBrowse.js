import React, { Component } from 'react';
import Web3 from 'web3';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
/* INFURA NODE */
/*var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ef64c86f37a84cc9a7929ba567d8138d'));*/
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
            block_data2: [],
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
            const block_datainfo2 = this.state.block_data2.slice();
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
                    block_datainfo2.push({
                        id: currBlockObj.number,
                        transno: web3.eth.getBlockTransactionCount(currBlockObj.number),
                        miner: currBlockObj.miner,
                        difficulty: parseInt(currBlockObj.difficulty),
                        hash:(web3.eth.getBlock(currBlockObj.number).hash)
                    })
                }
            }
            this.setState({
                block_ids: block_idno,
                block_data: block_datainfo,
                block_data2: block_datainfo2,
                curr_block_no: block_no
            })
        }
    }
    componentWillMount() {
        this.getBlocks(this.curr_block_no);
        this.refreshinterval = setInterval(this.getBlocks.bind(this), 5000); // runs every 5 seconds.

    }
    componentWillUnmount() {
        clearInterval(this.refreshinterval);
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

            clearInterval(this.refreshinterval);
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
        const columns = [
            { field: 'id', headerName: 'Block Number', flex: 0.1 },
            { field: 'transno', headerName: 'Number of Transactions', flex: 0.1 },
            { field: 'miner', headerName: 'Miner', flex: 0.3 },
            { field: 'difficulty', headerName: 'Difficulty', flex: 0.25 },
            {
                field: 'hash', headerName: 'Hash', flex: 0.25, 
                renderCell: (params) => (
                    <Link to={`/blocktable/${params.value}`}>{params.value}</Link>
                )},
                
        ];
        return (
            <div className="Home">
                <Box alignContent="flex-end" m={1}>
                    <Box pt={3}>
                    <Typography variant="h2">Home page</Typography>
                    </Box>
                    <Box pt={1}>
                    <Typography variant="h2">Currently Working with:Ganache at HTTP://127.0.0.1:7545</Typography>
                    </Box>
                    <Box pt={3}>
                    <Button variant="contained" color={this.state.button_state.color} onClick={() => this.handleClickButton()}>
                        {this.state.button_state.text}
                    </Button>
                    </Box>
                    <Box pt={3}>
                    <TableContainer >
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={this.state.block_data2}
                                columns={columns}
                                pageSize={10}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </div>
                    </TableContainer>
                    </Box>
                    <Box pt={3}>
                    <Typography variant="caption">Developed by Giulian Frisoni v1.0.1 June 19 2021</Typography>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default BlockBrowse;
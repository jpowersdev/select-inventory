import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'
import Inspector from 'react-inspector'
var ipc = require('electron').ipcRenderer;

export default class ItemPurchaseView extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            dateList: null,
            itemPurchaseList: null
        }
    }

    componentDidMount() {
        var that = this;

        ipc.send('get', 'orderDates');

        ipc.on('dateList', (event, dateList) => {
            // console.log(data);
            that.setState({dateList});
        })

        ipc.on('itemPurchaseList', (event, itemPurchaseList) => {
            that.setState({itemPurchaseList});
        })

        ipc.on('error', (event, arg) => {
            console.log(arg);
        })
    }

    render() {
        if (this.state.itemPurchaseList) {
            console.log(this.state.itemPurchaseList);
            return (
                <div id="workbook">
                    <h3>Item Purchase Inspector</h3>

                    <Inspector data={this.state.itemPurchaseList}/>
                </div>
            );
        }
        if (this.state.dateList) {
            console.log(this.state.dateList);
            return (
                <div id="workbook">
                    <h3>Item Purchase Inspector</h3>

                    <Inspector data={this.state.dateList}/>
                </div>
            );
        }
        return(
            <div id="workbook">
                <h3>Item Purchase Inspector</h3>
            </div>
        );
    }
}


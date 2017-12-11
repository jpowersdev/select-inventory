import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'
import fs from 'fs'
import Inspector from 'react-inspector'
var ipc = require('electron').ipcRenderer;

export default class WeeklyCount extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            date: '',
            count: null
        }
        this.loadFile = this.loadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {        
        var that = this;

        // Ask for Template
        ipc.send('get', 'items');
        
        ipc.on('itemList', function(event, arg) {
            that.setState({data});
        })
    }

    // loadFile() {
    //     // DEV
    //     // var wb = XLSX.readFile("/Users/jon/Dropbox/Jon Powers/Inventory/Order History/Order 12-10-17.xlsx");

    //     // PROD
    //     var dialog = require('electron').remote.dialog;
        
    //     var o = dialog.showOpenDialog({ properties: ['openFile'] });
    //     var wb = XLSX.readFile(o[0]);
        
    //     var data = [];

    //     wb.SheetNames.forEach(function(sheetName) {
	// 		data.push(
    //             XLSX.utils.sheet_to_json(
    //                 wb.Sheets[sheetName],
    //                 {range: 1}
    //             )
    //         )
    //     });

    //     this.setState({data});
    // }

    handleDateChange(event) {
        this.setState({date: event.target.value});
        console.log(event.target.value)
    }

    handleSubmit(){ 
        // ipc.send('post', {
        //     type: 'itemPurchase',
        //     data: this.state.data,
        //     date: this.state.date
        // });
        
        // fetch('http://localhost:8080/api/items', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(this.state.sheets)
        // }).then(response => console.log);
    };


    render() {
        if (this.state.data) {
            return(
                <div id="template">
                    <h3>Weekly Count</h3>

                    <Inspector data={this.state.data} />
                    
                    
                </div>
            )
        }
        return(
            <div id="template">
                <h3>Weekly Count</h3>

                <form>
                    <h3>Date of Count:</h3>
                    <input 
                        type="date" 
                        name="orderDate" 
                        value={this.state.date} 
                        onChange={this.handleDateChange} 
                    />
                </form>    
            </div>
        );
    }
}


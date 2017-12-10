import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'
import fs from 'fs'
import Inspector from 'react-inspector'
var ipc = require('electron').ipcRenderer;

export default class ItemPurchase extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            date: ''
        }
        this.loadFile = this.loadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {        
        ipc.on('response', (event, arg) => {
            console.log(arg);
        })

        ipc.on('error', (event, arg) => {
            console.log(arg);
        })
    }

    loadFile() {
        // PROD
        // var dialog = require('electron').remote.dialog;
        
        // var o = dialog.showOpenDialog({ properties: ['openFile'] });
        // var wb = XLSX.readFile(o[0]);

        // var data = [];

        // wb.SheetNames.forEach(function(sheetName) {
		// 	data.push(
        //         XLSX.utils.sheet_to_json(
        //             wb.Sheets[sheetName],
        //             {range: 1}
        //         )
        //     )
        // });

        // this.setState({data});

        // DEV
        var wb = XLSX.readFile("/Users/jon/Dropbox/Jon Powers/Inventory/Order History/Order 12-10-17.xlsx");
        
        var data = [];

        wb.SheetNames.forEach(function(sheetName) {
			data.push(
                XLSX.utils.sheet_to_json(
                    wb.Sheets[sheetName],
                    {range: 1}
                )
            )
        });

        this.setState({data});
    }

    handleChange(event) {
        this.setState({date: event.target.value});
        console.log(event.target.value)
    }

    handleSubmit(){ 
        ipc.send('post', {
            type: 'itemPurchase',
            data: this.state.data,
            date: this.state.date
        });
        
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
                    <h3>Template Uploader</h3>

                    <Inspector data={this.state.data} />
                    
                    <form>
                        <h3>Date of Order:</h3>
                        <input 
                            type="date" 
                            name="orderDate" 
                            value={this.state.date} 
                            onChange={this.handleChange} 
                        />
                    </form>

                    <button onClick={() => this.handleSubmit()}>
                        Add to Database
                    </button>
                </div>
            )
        }
        return(
            <div id="template">
                <h3>Template Uploader</h3>
                
                <button onClick={() => this.loadFile()}>
                    Load Data
                </button>     
            </div>
        );
    }
}


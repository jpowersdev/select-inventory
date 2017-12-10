import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'
// import Inspector from 'react-inspector'
var ipc = require('electron').ipcRenderer;

export default class Workbook extends Component {
    constructor() {
        super();
        this.state = {
            itemList: null,
        }
    }

    componentDidMount() {
        var that = this;

        ipc.send('get', 'items');

        ipc.on('itemList', (event, itemList) => {
            // console.log(data);
            that.setState({itemList});
        })

        ipc.on('error', (event, arg) => {
            console.log(arg);
        })
        
        // fetch('http://localhost:8080/api/items')
        // .then((response) => {
        //     return response.json();
        // }).then(data => {
        //     this.setState({data});
        // });
    }

    render() {
        if (this.state.itemList) {
            console.log(this.state.itemList);
            return (
                <div id="workbook">
                    <h3>Workbook Inspector</h3>

                    <table style={{"width": "100%"}}>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Par</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.itemList.map((d, i) => {
                                var doc = d._doc;
                                return(
                                    <tr key={i}>
                                        <td>{doc.code}</td>
                                        <td>{doc.name}</td> 
                                        <td>{doc.par}</td>
                                    </tr>
                                )  
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        return(
            <div id="workbook">
                <h3>Workbook Inspector</h3>
            </div>
        );
    }
}


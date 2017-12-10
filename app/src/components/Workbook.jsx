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
            data: null,
        }
    }

    componentDidMount() {
        var that = this;

        ipc.send('get', 'items');

        ipc.on('data', (event, data) => {
            // console.log(data);
            that.setState({data});
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
        if (this.state.data) {
            console.log(this.state.data);
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
                            {this.state.data.map((d, i) => {
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


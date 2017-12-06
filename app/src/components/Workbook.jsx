import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'

export default class Workbook extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
        }
        this.loadFile = this.loadFile.bind(this);
    }

    loadFile() {
        var dialog = require('electron').remote.dialog;
        
        var o = dialog.showOpenDialog({ properties: ['openFile'] });
        var wb = XLSX.readFile(o[0]);

        var sheets = [];

        wb.SheetNames.forEach(function(sheetName) {
			sheets.push(
                XLSX.utils.sheet_to_json(
                    wb.Sheets[sheetName],
                    {range: 1}
                )
            )
		});

        this.setState({data: sheets});
    }

    render() {
        var sheets;
        if (this.state.data) {
            sheets = this.state.data.map( (s, i) => {
                var rows;
                console.log(s);

                rows = s.map( (r, i) => {
                    return (
                        <div key={i} id={r.Name} >
                            <h4>{r.Code} - {r.Name}</h4>
                            <p>
                                Usage: {r.Usage}<br/>
                                Unit: {r.Unit}<br/>
                                Par: {r.Par}
                            </p>
                        </div>   
                    );
                });
                
                switch (i) {
                    case 0:
                        return (
                            <div key={i}>
                                <h4>
                                    Frozen
                                </h4>
                                {rows}
                            </div>
                        );
                        break;
                    case 1:
                        return (
                            <div key={i}>
                                <h4>
                                    Refrigerated
                                </h4>
                                {rows}
                            </div>
                        );
                        break;
                    case 2:
                        return (
                            <div key={i}>
                                <h4>
                                    Dry Goods
                                </h4>
                                {rows}
                            </div>
                        );
                        break;
                    case 3:
                        return (
                            <div key={i}>
                                <h4>
                                    Non Foods
                                </h4>
                                {rows}
                            </div>
                        );
                        break;
                    default:
                        break;
                }
                
            });
        }
        return(
            <div id="loader">
                <h3>Workbook Loader</h3>
                
                <button onClick={() => this.loadFile()}>
                    Load Data
                </button>       
                {sheets}
            </div>
        )
    }
}


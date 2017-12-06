import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'
import fs from 'fs'
import Inspector from 'react-inspector'


export default class Template extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            sheets: {
                frozen: null,
                refrigerated: null,
                dry: null,
                paper: null
            },
        }
        this.loadFile = this.loadFile.bind(this);
    }

    componentDidMount() {
        var wb = XLSX.readFile("/Users/jon/dev/select/inventory/node/select-inventory/data/Order Template.xlsx");
        
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

    loadFile() {
        var dialog = require('electron').remote.dialog;
        
        var o = dialog.showOpenDialog({ properties: ['openFile'] });
        console.log(o);
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

    createJSON(json) {
        fs.writeFile('template.json', json, 'utf8', (out) => {
            console.log(out);
        });
    }

    render() {
        if (this.state.data) {
            var sheets = {
                frozen: null,
                refrigerated: null,
                dry: null,
                paper: null 
            };

            this.state.data.map( (s, i) => {
                switch (i) {
                    case 0:
                        sheets.frozen = s;
                        break;
                    case 1:
                        sheets.refrigerated = s;
                        break;
                    case 2:
                        sheets.dry = s;
                        break;   
                    case 3:
                        sheets.paper = s;
                        break;
                    default:
                        break;
                }
            });

            return(
                <div id="loader">
                    {/* <h3>Workbook Loader</h3>
                    
                    <button onClick={() => this.loadFile()}>
                        Load Data
                    </button>       

                    <br/> */}
                    <Inspector data={sheets} />
                </div>
            )
        }
        return(
            <div id="loader">
                <h3>Workbook Loader</h3>
                
                <button onClick={() => this.loadFile()}>
                    Load Data
                </button>     
            </div>
        );
    }
}


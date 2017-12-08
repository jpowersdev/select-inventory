import React, {Component}  from 'react'
import { dialog } from 'electron';
import styles from '../styles/local.css'
import XLSX from 'xlsx'
import Inspector from 'react-inspector'

export default class Workbook extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/items')
        .then((response) => {
            return response.json();
        }).then(data => {
            this.setState({data});
        });
    }

    render() {
        if (this.state.data) {
            // console.log(this.state.data);
            return (
                <div id="loader">
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
                                return(
                                    <tr key={i}>
                                        <td>{d.code}</td>
                                        <td>{d.name}</td> 
                                        <td>{d.par}</td>
                                    </tr>
                                )  
                            })}
                        </tbody>
                    </table>

                    {/* <Inspector data={this.state.data} /> */}
                </div>
            );
        }
        return(
            <div id="loader">
                <h3>Workbook Inspector</h3>
            </div>
        );
    }
}


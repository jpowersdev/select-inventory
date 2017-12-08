import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
  } from 'react-router-dom'
import {} from './styles/global.css'

import Workbook from './components/Workbook.jsx'
import Template from './components/Template.jsx'

// const logos = [
//     require('./assets/electron.png'),
//     require('./assets/react.png'),
//     require('./assets/webpack.png')
// ]

const NavSidebar = () => (
    <div>
        <h2><Link to="/">Select Inventory</Link></h2>
        <h3>Count</h3>
        <h3>Order</h3>
        <ul className="sublist">
            <li><Link to="/workbook">Workbook</Link></li>
            <li><Link to="/template">Template</Link></li>
        </ul>
        <h3>Shipment</h3>
        <h3>Report</h3>
    </div>
);

export default class App extends Component {
    render() {
        const Index = () => (
            <div></div>
        )
        return (
            <Router>
                <div className="container">
                    <div className="sidebar">
                        <NavSidebar/>
                    </div>
                    <div className="body">
                        <Route exact path="/" component={Index}/>
                        <Route path="/workbook" component={Workbook}/>
                        <Route path="/template" component={Template}/>
                    </div>
                </div>
            </Router>
        )
    }
}

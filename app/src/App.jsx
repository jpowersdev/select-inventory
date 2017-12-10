import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'

import Workbook from './components/Workbook.jsx'
import Template from './components/Template.jsx'
import ItemPurchase from './components/ItemPurchase.jsx'
import ItemPurchaseView from './components/ItemPurchaseView.jsx'

class NavSidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Select Inventory</h2>
                <h3>Count</h3>
                <ul className="sublist">
                    <li><a href="#" onClick={() => this.props.changePage('workbook')}>Workbook</a></li>
                    <li><a href="#" onClick={() => this.props.changePage('template')}>Template</a></li>
                </ul>
                <h3>Order</h3>
                <ul className="sublist">
                    <li><a href="#" onClick={() => this.props.changePage('itemPurchase')}>Item Purchase</a></li>
                    <li><a href="#" onClick={() => this.props.changePage('itemPurchaseView')}>Item Purchase View</a></li>
                </ul>
                <h3>Shipment</h3>
                <ul className="sublist">
                    <li><a href="#" onClick={() => this.props.changePage('workbook')}>Workbook</a></li>
                    <li><a href="#" onClick={() => this.props.changePage('template')}>Template</a></li>
                </ul>
                <h3>Report</h3>
                <ul className="sublist">
                    <li><a href="#" onClick={() => this.props.changePage('workbook')}>Item Analysis</a></li>
                    <li><a href="#" onClick={() => this.props.changePage('template')}>Order Analysis</a></li>
                </ul>
            </div>
        );
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'workbook'
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(page) {
        this.setState({page})
    }

    render() {
        return (
            <div className="container">
                <div className="sidebar">
                    <NavSidebar changePage={this.changePage}/>
                </div>
                <div className="body">
                    <div>
                        {this.state.page == 'workbook' ? <Workbook /> : <span/>}
                        {this.state.page == 'template' ? <Template /> : <span/>}
                        {this.state.page == 'itemPurchase' ? <ItemPurchase /> : <span/>}
                        {this.state.page == 'itemPurchaseView' ? <ItemPurchaseView /> : <span/>}
                    </div>
                </div>
            </div>
        )
    }
}

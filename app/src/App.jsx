import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'

// import Workbook from './components/Workbook.jsx'
import Template from './components/Template.jsx'

// const logos = [
//     require('./assets/electron.png'),
//     require('./assets/react.png'),
//     require('./assets/webpack.png')
// ]


export default class App extends Component {
    render() {
        return (
            <div>
                <Template/>
            </div>
        )
    }
}

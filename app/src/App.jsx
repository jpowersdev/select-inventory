import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'
import Workbook from './components/Workbook.jsx'
import Template from './components/Template.jsx'

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
]


export default class App extends Component {
    render() {
        const logosRender = logos.map( (logo, index) => {
            return <Logo key = {index} src = { logo } />
        })

        return (
            <div>
                <Template/>
            </div>
        )
    }
}

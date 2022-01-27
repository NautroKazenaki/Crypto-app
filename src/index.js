import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App';
import store from './app/store'
import 'antd/dist/antd.css';

ReactDOM.render(
    // to switch urls and show diff components
    <Router>
        {/* makes every component be connected to store */}
        <Provider store={store}>
            <App /> 
        </Provider>
    </Router>, document.getElementById('root'))
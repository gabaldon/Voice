import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'

import "cesium/Source/Widgets/widgets.css";
// import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";
// buildModuleUrl.setBaseUrl('./cesium/');

ReactDOM.render((
<Router>
<App />
</Router>), document.getElementById('root'));





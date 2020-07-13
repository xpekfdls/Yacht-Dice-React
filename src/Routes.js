import React from 'react';

import { 
	BrowserRouter  as Router, 
	Switch,
	Route
} from "react-router-dom";

import App from './App.js'
import Yacht from './Yacht.js'


const io = require('socket.io-client');
// const socket = io('http://yacht.sonjh02.me:8317');
const socket = io('http://localhost:8317');

class Routes extends React.Component {
	render(){
		return(
			<Router>
				<Switch>
					<Route exact path="/" component={() => <App socket={socket}/>} />
					<Route exact path="/game" component={() => <Yacht socket={socket}/>} />
				</Switch>
			</Router>
		)
	}
}

export default Routes;
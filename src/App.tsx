import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GalleryContainer from './components/layout/GalleryContainer';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={GalleryContainer} />
				</Switch>
			</Router>
			<div id='bg'></div>
		</div>
	);
}

export default App;

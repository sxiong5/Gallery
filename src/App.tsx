import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GalleryCard from './components/layout/GalleryCard';
import routes from './routes';
import './App.css';

function App() {
	const [codeVisible, setCodeVisible] = useState<boolean>(false);
	const [html, setHtml] = useState<string>('');
	const [css, setCss] = useState<string>('');

	return (
		<div className='App'>
			<Router>
				<Switch>
					<GalleryCard html={html} css={css} codeVisible={codeVisible} setCodeVisible={setCodeVisible}>
						{routes.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								render={props => (
									<route.component
										setHtml={setHtml}
										setCss={setCss}
										className={codeVisible ? 'show-code' : undefined}
										{...props}
									/>
								)}
							/>
						))}
					</GalleryCard>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps } from 'react-router-dom';
import { GalleryChildrenProps } from './@types/gallery';
import './App.css';
import ColorfuleButton from './components/gallery/ColorfuleButton';
import MirrorButton from './components/gallery/MirrorButton';
import GalleryCard from './components/layout/GalleryCard';

function App() {
	const [codeVisible, setCodeVisible] = useState<boolean>(false);
	const [html, setHtml] = useState<string>('');
	const [css, setCss] = useState<string>('');

	return (
		<div className='App'>
			<Router>
				<Switch>
					<GalleryCard html={html} css={css} codeVisible={codeVisible} setCodeVisible={setCodeVisible}>
						<Route
							exact
							path='/'
							render={props => (
								<MirrorButton
									setHtml={setHtml}
									setCss={setCss}
									className={codeVisible ? 'show-code' : undefined}
									{...props}
								/>
							)}
						/>
					</GalleryCard>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

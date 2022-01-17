import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, RouteComponentProps, useLocation, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import GalleryCard from './components/layout/GalleryCard';
import routes from './routes';
import Home from './components/layout/Home';

export interface AppProps {
	setIndex: (type: 1 | -1) => void;
}

const App: React.FC<RouteComponentProps> = ({ history }) => {
	const [codeVisible, setCodeVisible] = useState<boolean>(false);
	const [html, setHtml] = useState<string>('');
	const [css, setCss] = useState<string>('');
	const [animateClass, setAnimateClass] = useState('to-left');
	const [demoIndex, setDemoIndex] = useState<number>(0);
	const location = useLocation();

	const setIndex = (type: 1 | -1) => {
		type > 0 ? setAnimateClass('to-left') : setAnimateClass('to-right');
		let index = demoIndex + type;
		if (index < 0) index = routes.length - 1;
		else if (index >= routes.length) index = 0;
		setDemoIndex(index);
	};

	useEffect(() => {
		setDemoIndex(0);
	}, []);

	useEffect(() => {
		location.pathname !== '/' && history.push(routes[demoIndex].path);
	}, [demoIndex]);

	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' render={() => <Home demoIndex={demoIndex} />} />
				<Route
					path='/galleries'
					render={() => (
						<GalleryCard
							html={html}
							css={css}
							codeVisible={codeVisible}
							setCodeVisible={setCodeVisible}
							setIndex={setIndex}
							setDemoIndex={setDemoIndex}
						>
							<TransitionGroup>
								<CSSTransition key={location.pathname} timeout={1000} classNames={animateClass}>
									<Switch location={location}>
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
									</Switch>
								</CSSTransition>
							</TransitionGroup>
						</GalleryCard>
					)}
				/>
			</Switch>
		</div>
	);
};

export default withRouter(App);

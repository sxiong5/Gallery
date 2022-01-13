import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { BrowserRouter as Router } from 'react-router-dom';

const theme: Theme = createTheme({
	palette: {
		primary: {
			main: deepPurple['A200'],
			dark: deepPurple['A400'],
			light: deepPurple['A100']
		}
	}
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Router>
			<App />
		</Router>
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

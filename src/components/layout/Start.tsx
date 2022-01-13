import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import routes from '../../routes';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const StarWrapper = styled(Box)(() => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'all 0.5s',
	userSelect: 'none',
	cursor: 'pointer',
	'&:hover': {
		transform: 'scale(1.2)'
	},
	'&:hover .btn': {
		opacity: 1
	},
	'&:hover .up': {
		top: '-50px',
		opacity: 0.7
	},
	'&:hover .down': {
		top: '50px',
		opacity: 0.7
	}
}));

const StartTitle = styled(Typography)(() => ({
	margin: 0,
	color: '#fff',
	fontStyle: 'italic',
	fontSize: '10vw',
	top: 0,
	opacity: 1,
	transition: 'all 0.5s',
	zIndex: 1,
	'&.up': {
		position: 'absolute',
		clipPath: 'polygon(0 0, 100% 0, 105% 51%, 0 51%)'
	},
	'&.down': {
		position: 'relative',
		clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)'
	}
}));

const StartButton = styled(Button)(() => ({
	position: 'absolute',
	opacity: 0,
	transform: 'opacity 0.5s'
}));

const Instruction = styled(Typography)(({ theme }) => ({
	color: 'rgba(255, 255, 255, .8)',
	zIndex: 2,
	top: 0,
	position: 'relative',
	transition: 'all 0.5s',
	'.start:hover ~ &': {
		top: '65px',
		color: theme.palette.primary.dark
	}
}));

const Start: React.FC<RouteComponentProps> = ({ history }) => {
	const toDemo = () => {
		const { path } = routes[0];
		history.push(path);
	};

	return (
		<>
			<StarWrapper className='start'>
				<StartTitle className='up'>Gallery</StartTitle>
				<StartTitle className='down'>Gallery</StartTitle>
				<StartButton className='btn' variant='outlined' sx={{ borderRadius: '50px' }} onClick={toDemo}>
					Click to Start
				</StartButton>
			</StarWrapper>
			<Instruction variant='h5'>A Gallery from some intresting components</Instruction>
		</>
	);
};

export default withRouter(Start);

import React from 'react';
import { Box } from '@mui/material';
import Background from './Background';
import Start from './Start';

export interface HomeProps {
	demoIndex: number;
}

const Home: React.FC<HomeProps> = ({ demoIndex }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexFlow: 'column nowrap',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100vw',
				height: '100vh',
				position: 'relative',
				backgroundImage: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)'
			}}
		>
			<Background />
			<Start demoIndex={demoIndex} />
		</Box>
	);
};

export default Home;

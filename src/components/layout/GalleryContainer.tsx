import React, { forwardRef } from 'react';
import { Box } from '@mui/system';
import GalleryCard from './GalleryCard';

const GalleryContainer = (_: any, ref: any) => {
	return (
		<Box ref={ref} sx={{ height: '100vh' }}>
			<GalleryCard />
		</Box>
	);
};

export default forwardRef(GalleryContainer);

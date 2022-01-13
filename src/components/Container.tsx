import { Box, styled } from '@mui/material';
import React from 'react';

interface DemoContainerProps {
	id: string;
	className?: string;
	styles: string;
	children?: JSX.Element;
}

export default (style: string) => {
	return styled(Box)`
		${style}
		width: 100vw;
		position: relative;
	`;
};

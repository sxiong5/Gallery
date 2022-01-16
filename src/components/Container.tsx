import { Box, styled } from '@mui/material';

export default (style: string) => {
	return styled(Box)`
		${style}
		width: 100%;
		position: relative;
	`;
};

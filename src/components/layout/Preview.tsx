import React from 'react';
import { Box, styled, Tooltip, Typography } from '@mui/material';
import routes from '../../routes';

interface PreviewProps {
	className?: string;
	setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
	setDemoIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PreviewWrapper = styled(Box)`
	position: fixed;
	display: flex;
	alignitems: center;
	width: 100%;
	bottom: 0;
	padding: 5px;
	background: rgba(255, 255, 255, 0.3);
	transition: all 0.5s;
	&.hide {
		transform: translateY(100%);
	}
`;

const Img = styled('img')`
	width: 8%;
	margin: 0 10px;
	transition: all 0.5s;
	transform-origin: bottom;
	cursor: pointer;
	float: left;
	border-radius: 8px;
	&:hover {
		transform: scale(1.5);
		margin: 0 30px;
	}
`;

const Preview: React.FC<PreviewProps> = ({ className, setShowPreview, setDemoIndex }) => {
	return (
		<PreviewWrapper className={className} onMouseLeave={() => setShowPreview(false)}>
			{routes.map((item, index) => (
				<Tooltip key={item.name} title={item.name} placement='top' onClick={() => setDemoIndex(index)}>
					<Img src={item.imgSrc} loading='lazy' />
				</Tooltip>
			))}
		</PreviewWrapper>
	);
};

export default Preview;

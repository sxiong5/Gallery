import React from 'react';
import { Box, styled, Tooltip } from '@mui/material';
import routes from '../../routes';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface PreviewProps extends RouteComponentProps {
	className?: string;
	setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
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

const Preview: React.FC<PreviewProps> = ({ className, setShowPreview, history }) => {
	return (
		<PreviewWrapper className={className} onMouseLeave={() => setShowPreview(false)}>
			{routes.map(item => (
				<Tooltip key={item.name} title={item.name} placement='top' onClick={() => history.push(item.path)}>
					<Img src={item.imgSrc} loading='lazy' />
				</Tooltip>
			))}
		</PreviewWrapper>
	);
};

export default withRouter(Preview);

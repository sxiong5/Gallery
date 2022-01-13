import React, { useEffect, useState } from 'react';
import { Box, IconButton, styled, Tooltip } from '@mui/material';
import showdown from 'showdown';
import 'highlight.js/styles/night-owl.css';
import showdownHighlight from 'showdown-highlight';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';

interface GalleryCardProps {
	children: JSX.Element | JSX.Element[];
	html: string;
	css: string;
	codeVisible: boolean;
	setCodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GalleryCardWrapper = styled(Box)`
	width: 100vw;
	min-height: 100vh;
`;

const CodeContainer = styled(Box)`
	color: #fff;
	font-size: 1rem;
`;

const Code = styled(Box)`
	& pre {
		height: 40vh;
		overflow-y: auto;
	}
	& .hljs {
	}
`;

const CodeButtonWrapper = styled(IconButton)(({ theme }) => ({
	position: 'fixed',
	bottom: '30px',
	right: '30px',
	zIndex: theme.zIndex.tooltip
}));

const GalleryCard: React.FC<GalleryCardProps> = ({ children, html, css, codeVisible, setCodeVisible }) => {
	const [htmlCode, setHtmlCode] = useState<string>('');
	const [cssCode, setCssCode] = useState<string>('');
	const converter = new showdown.Converter({ extensions: [showdownHighlight({ pre: true })] });

	useEffect(() => {
		setCodeVisible(false);

		setHtmlCode(converter.makeHtml(html));
		setCssCode(converter.makeHtml(css));
	}, [html, css]);

	return (
		<GalleryCardWrapper>
			{children}
			{codeVisible ? (
				<CodeContainer className='code-container'>
					<Code dangerouslySetInnerHTML={{ __html: htmlCode }}></Code>
					<Code dangerouslySetInnerHTML={{ __html: cssCode }}></Code>
				</CodeContainer>
			) : null}
			<Tooltip title='Code' placement='left'>
				<CodeButtonWrapper color='primary' onClick={() => setCodeVisible(!codeVisible)}>
					{codeVisible ? <CodeOffIcon /> : <CodeIcon />}
				</CodeButtonWrapper>
			</Tooltip>
		</GalleryCardWrapper>
	);
};

export default GalleryCard;

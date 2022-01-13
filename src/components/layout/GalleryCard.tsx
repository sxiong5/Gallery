import React, { useEffect, useState } from 'react';
import { Box, IconButton, styled, Tooltip, useTheme } from '@mui/material';
import showdown from 'showdown';
import 'highlight.js/styles/night-owl.css';
import showdownHighlight from 'showdown-highlight';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface GalleryCardProps {
	children: JSX.Element[] | JSX.Element;
	html: string;
	css: string;
	codeVisible: boolean;
	setCodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setIndex: (type: 1 | -1) => void;
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
	zIndex: theme.zIndex.tooltip,
	transition: 'all 0.5s'
}));

const SwitchButtonWrapper = styled(IconButton)(({ theme }) => ({
	position: 'fixed',
	top: '50%',
	transform: 'translateY(-50%)',
	zIndex: theme.zIndex.tooltip,
	transition: 'all 0.5s'
}));

const GalleryCard: React.FC<GalleryCardProps> = ({ children, html, css, codeVisible, setCodeVisible, setIndex }) => {
	const {
		palette: { primary }
	} = useTheme();
	const [htmlCode, setHtmlCode] = useState<string>('');
	const [cssCode, setCssCode] = useState<string>('');
	const [btnColor, setBtnColor] = useState<string>(primary.contrastText);
	const converter = new showdown.Converter({ extensions: [showdownHighlight({ pre: true })] });

	useEffect(() => {
		setCodeVisible(false);

		setHtmlCode(converter.makeHtml(html));
		setCssCode(converter.makeHtml(css));
	}, [html, css]);

	useEffect(() => {
		codeVisible ? setBtnColor(primary.main) : setBtnColor(primary.contrastText);
	}, [codeVisible]);

	return (
		<GalleryCardWrapper>
			{children}
			<SwitchButtonWrapper sx={{ left: '3%', color: btnColor }} onClick={() => setIndex(-1)}>
				<ChevronLeftIcon fontSize='large' />
			</SwitchButtonWrapper>
			<SwitchButtonWrapper sx={{ right: '3%', color: btnColor }} onClick={() => setIndex(1)}>
				<ChevronRightIcon fontSize='large' />
			</SwitchButtonWrapper>
			{codeVisible ? (
				<CodeContainer className='code-container'>
					<Code dangerouslySetInnerHTML={{ __html: htmlCode }}></Code>
					<Code dangerouslySetInnerHTML={{ __html: cssCode }}></Code>
				</CodeContainer>
			) : null}
			<Tooltip title='Code' placement='left'>
				<CodeButtonWrapper onClick={() => setCodeVisible(!codeVisible)} sx={{ color: btnColor }}>
					{codeVisible ? <CodeOffIcon /> : <CodeIcon />}
				</CodeButtonWrapper>
			</Tooltip>
		</GalleryCardWrapper>
	);
};

export default GalleryCard;

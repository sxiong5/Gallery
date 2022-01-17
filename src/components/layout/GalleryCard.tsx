import React, { useEffect, useState } from 'react';
import { Box, IconButton, styled, Tooltip, useTheme } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import showdown from 'showdown';
import 'highlight.js/styles/nnfx-dark.css';
import showdownHighlight from 'showdown-highlight';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CodePanel from './CodePanel';
import Preview from './Preview';

interface GalleryCardProps {
	children: JSX.Element[] | JSX.Element;
	html: string;
	css: string;
	codeVisible: boolean;
	setCodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setIndex: (type: 1 | -1) => void;
	setDemoIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SwitchButtonWrapper = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	zIndex: theme.zIndex.tooltip,
	transition: 'all 0.5s'
}));

const CodeButtonWrapper = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	right: 0,
	zIndex: theme.zIndex.tooltip,
	transition: 'all 0.5s',
	color: '#fff',
	transform: 'translate(-100%, 0)',
	margin: '15px'
}));

const GalleryCard: React.FC<GalleryCardProps> = ({
	children,
	html,
	css,
	codeVisible,
	setCodeVisible,
	setIndex,
	setDemoIndex
}) => {
	const {
		palette: { primary }
	} = useTheme();
	const [htmlCode, setHtmlCode] = useState<string>('');
	const [cssCode, setCssCode] = useState<string>('');
	const [btnColor, setBtnColor] = useState<string>(primary.contrastText);
	const [showPreview, setShowPreview] = useState<boolean>(false);
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
		<Box sx={{ width: '100vw', height: '100vh', display: 'flex', '& > div': { flexGrow: 1 } }}>
			<Box sx={{ position: 'relative' }}>
				{children}
				<Tooltip title='Code' placement='left'>
					<CodeButtonWrapper onClick={() => setCodeVisible(!codeVisible)}>
						{codeVisible ? <CodeOffIcon /> : <CodeIcon />}
					</CodeButtonWrapper>
				</Tooltip>
				<SwitchButtonWrapper sx={{ left: '3%', color: btnColor }} onClick={() => setIndex(-1)}>
					<ChevronLeftIcon fontSize='large' />
				</SwitchButtonWrapper>
				<SwitchButtonWrapper sx={{ right: '3%', color: btnColor }} onClick={() => setIndex(1)}>
					<ChevronRightIcon fontSize='large' />
				</SwitchButtonWrapper>

				{!showPreview && (
					<IconButton
						sx={{ color: '#fff', position: 'absolute', margin: 'auto', left: 0, right: 0, bottom: '5px' }}
						onClick={() => setShowPreview(!showPreview)}
					>
						<ArrowDropUpIcon fontSize='large' />
					</IconButton>
				)}
				<Preview
					className={showPreview ? 'show' : 'hide'}
					setShowPreview={setShowPreview}
					setDemoIndex={setDemoIndex}
				/>
			</Box>
			<CSSTransition unmountOnExit in={codeVisible} timeout={500} classNames='slide-in'>
				<CodePanel code={{ html: htmlCode, css: cssCode }} codeVisible={codeVisible} setCodeVisible={setCodeVisible} />
			</CSSTransition>
		</Box>
	);
};

export default GalleryCard;

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Box, styled } from '@mui/material';
import showdown from 'showdown';
import 'highlight.js/styles/night-owl.css';
import showdownHighlight from 'showdown-highlight';

const CodeContainer = styled(Box)`
	position: absolute;
	color: #fff;
	font-size: 1rem;
`;

const Code = styled(Box)`
	& pre {
		height: 40vh;
		overflow-y: auto;
	}
	& .hljs {
		background: transparent;
	}
`;

const GalleryCard = () => {
	const iframeRef = useRef<HTMLIFrameElement>() as React.MutableRefObject<HTMLIFrameElement>;
	const [html, setHtml] = useState<string>('');
	const [css, setCss] = useState<string>('');
	const converter = new showdown.Converter({ extensions: [showdownHighlight({ pre: true })] });

	const getCode = () => {
		const { current } = iframeRef;
		const doc = current?.contentWindow?.document;

		console.log(doc?.documentElement.innerHTML!);

		let [_, styleCode, htmlCode] = doc?.documentElement.innerHTML!.match(
			/<style>([\s\S]*)<\/style>[\s\S]*<body .*>([\s\S]*)<\/body>/
		) as RegExpMatchArray;

		setCss(converter.makeHtml(styleCode));
		setHtml(converter.makeHtml(htmlCode));
	};

	useEffect(() => {
		const { current } = iframeRef;
		current?.contentWindow?.addEventListener('click', getCode);
		return () => current?.contentWindow?.removeEventListener('click', getCode);
	}, []);

	return (
		<Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }} onClick={getCode}>
			<CodeContainer>
				<Code dangerouslySetInnerHTML={{ __html: html }}></Code>
				<Code dangerouslySetInnerHTML={{ __html: css }}></Code>
			</CodeContainer>
			<iframe ref={iframeRef} src='/demo/1.html' frameBorder='0' height='100%' width='100%'></iframe>
		</Box>
	);
};

export default forwardRef(GalleryCard);

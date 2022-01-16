import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface CodePanelProps {
	code: {
		html: string;
		css: string;
	};
	codeVisible: boolean;
	setCodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, setCodeVisible, codeVisible }) => {
	const [currentSnippets, setCurrentSnippets] = useState<'html' | 'css'>('html');

	return (
		<Box
			component='section'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
				boxSizing: 'border-box',
				position: 'relative'
			}}
		>
			<Tabs value={currentSnippets} onChange={(_, newVal) => setCurrentSnippets(newVal)}>
				<Tab label='HTML' value='html' />
				<Tab label='CSS' value='css' />
			</Tabs>
			<Box sx={{ flexFlow: '1', overflow: 'auto' }}>
				<Box dangerouslySetInnerHTML={{ __html: code[currentSnippets] }}></Box>
			</Box>
		</Box>
	);
};

export default CodePanel;

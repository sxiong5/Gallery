export const formatHtml = (html: string): string => {
	const arr = html.replaceAll('<', '\n<').split('\n');

	const stack: string[] = [];
	const formattedHtml: string = arr
		.reduce((pre: string[], cur: string) => {
			if (cur !== '') {
				if (cur.match(/<(\w+).+>/)) {
					const tagName = (cur.match(/<(\w+).+>/) as RegExpMatchArray)[1];
					pre.push(addTab(stack.length) + cur);
					stack.push(tagName);
				} else if (cur.match(/<\/(\w+)>/)) {
					stack.pop();
					pre.push(addTab(stack.length) + cur);
				} else {
					pre.push(addTab(stack.length) + cur);
				}
			}
			return pre;
		}, [] as string[])
		.join('\n');

	return `\`\`\`html\n${formattedHtml}\n\`\`\``;
};

const addTab = (num: number): string => {
	let tabs: string = '';
	for (let i = 0; i < num; i++) {
		tabs += '  ';
	}
	return tabs;
};

export const formatCss = (css: string): string => {
	return `\`\`\`css${css}\`\`\``;
};

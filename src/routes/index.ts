import { toKebabCase } from '../utils';

const Demos = require.context('../components/gallery', false, /\.tsx$/);

const routes = Demos.keys().map(key => {
	const name = (key.match(/^\.\/(\w+)\.tsx$/) as RegExpMatchArray)[1];
	const kebabCase = toKebabCase(name);
	return {
		path: `/galleries/${kebabCase}`,
		component: Demos(key).default,
		img: `https://storage.cloud.google.com/gallery_preview/${kebabCase}.png`
	};
});

export default routes;

import { toKebabCase } from '../utils';

interface RouteConfig {
	name: string;
	route: string;
	path: string;
	component: any;
	imgSrc: string;
}

const Demos = require.context('../components/gallery', false, /\.tsx$/);

const routes: RouteConfig[] = Demos.keys().map(key => {
	const name = (key.match(/^\.\/(\w+)\.tsx$/) as RegExpMatchArray)[1];
	const kebabCase = toKebabCase(name);
	return {
		name,
		route: kebabCase,
		path: `/galleries/${kebabCase}`,
		component: Demos(key).default,
		imgSrc: `https://storage.cloud.google.com/gallery_preview/${kebabCase}.png`
	};
});

export default routes;

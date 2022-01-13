import { toKebabCase } from '../utils';

const Demos = require.context('../components/gallery', false, /\.tsx$/);

const routes = Demos.keys().map(key => {
	const name = (key.match(/^\.\/(\w+)\.tsx$/) as RegExpMatchArray)[1];
	return {
		path: `/${toKebabCase(name)}`,
		component: Demos(key).default
	};
});

export default routes;

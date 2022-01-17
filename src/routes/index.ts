import { toKebabCase } from '../utils';

const storage = {
	gcs: 'https://storage.cloud.google.com/gallery_preview/',
	oss: 'https://gallery-preview.oss-cn-shanghai.aliyuncs.com/'
};

const src = window.navigator.language === 'zh-CN' ? storage['oss'] : storage['gcs'];
console.log(window.navigator.language);

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
		imgSrc: `${src}${kebabCase}.png`
	};
});

export default routes;

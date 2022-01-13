import { RouteComponentProps } from 'react-router-dom';

export interface GalleryChildrenProps extends RouteComponentProps {
	setHtml: Function;
	setCss: Function;
	className?: string;
}

declare module 'react' {
	interface SVGProps<SVGSVGElement> {
		// For theme-ui
		xmlnsSvgjs: string;
	}
}

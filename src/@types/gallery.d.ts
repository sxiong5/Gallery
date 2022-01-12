import { RouteComponentProps } from 'react-router-dom';

export interface GalleryChildrenProps extends RouteComponentProps {
	setHtml: Function;
	setCss: Function;
	className?: string;
}

import { type } from 'os';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface GalleryChildrenProps extends RouteComponentProps {
	setHtml: Function;
	setCss: Function;
	className?: string;
}

export namespace Gallery {
	import { FunctionComponent } from 'react';

	export type FC<P = {}> = FunctionComponent<P> & {
		updateTime: string;
	};
}

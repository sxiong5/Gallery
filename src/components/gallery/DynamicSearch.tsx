import React, { useEffect, useState } from 'react';
import { Gallery, GalleryChildrenProps } from '../../@types/gallery';
import SearchIcon from '@mui/icons-material/Search';
import container from '../Container';
import { flexCenter, resetAll } from './common';
import { formatCss, formatHtml, toKebabCase } from '../../utils';
import { useLocation, withRouter } from 'react-router-dom';

const style = `
${resetAll}
.dynamic-search__container {
  ${flexCenter}
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
}
.dynamic-search {
  background-color: #2f3640;
  height: 40px;
  padding: 10px;
  border-radius: 40px;
}
.dynamic-search .search-text {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding; 0;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  transition: 0.4s;
}
.dynamic-search .search-btn {
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2f3640;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.4s;
}
.dynamic-search:hover .search-text {
  width: 300px;
  padding: 0 6px;
}
.dynamic-search:hover .search-btn {
  background-color: #fff;
}
`;

const Container = container(style);

const DynamicSearch: Gallery.FC<GalleryChildrenProps> = ({ setHtml, setCss, className, history }) => {
	const [state, setState] = useState<string>('initialState');
	const location = useLocation();

	useEffect(() => {
		const html = document
			.getElementById('dynamic-search')
			?.innerHTML.replace(/<svg[\s\S]+?<\/svg>/g, '<!-- Your icon -->');
		setHtml(formatHtml(html!));
		setCss(formatCss(style));
	}, []);

	const switchTo = () => {
		// const route = `/galleries/${toKebabCase(state)}`;
		// location.pathname !== route && history.push(route);
		history.push(`/galleries/${toKebabCase(state)}`);
	};

	return (
		<Container className={`gallery-demo ${className ?? ''}`} id='dynamic-search'>
			<div className='dynamic-search__container'>
				<div className='dynamic-search'>
					<input
						type='text'
						className='search-text'
						placeholder='Type in the component name'
						onChange={e => setState(e.target.value)}
					/>
					<span className='search-btn' onClick={switchTo}>
						<SearchIcon />
					</span>
				</div>
			</div>
		</Container>
	);
};

DynamicSearch.updateTime = '01/16/2022';

export default withRouter(DynamicSearch);

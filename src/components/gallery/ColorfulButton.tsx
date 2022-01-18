import React, { useEffect } from 'react';
import { Gallery, GalleryChildrenProps } from '../../@types/gallery';
import { formatCss, formatHtml } from '../../utils';
import container from '../Container';
import { flexCenter, resetAll } from './common';

const style = `
${resetAll}
.colorful-btn__container {
  ${flexCenter}
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
}
.colorful-btn__container a {
  position: relative;
  display: block;
  width: 140px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 40px;
  color: plum;
  text-decoration: none;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  filter: hue-rotate(calc(var(--i) * 60deg));
}
.colorful-btn__container a::before,
.colorful-btn__container a::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid plum;
  transition: all 0.3s ease-in-out 0.3s;
}
.colorful-btn__container a::before {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
}
.colorful-btn__container a::after {
  right: 0;
  bottom: 0;
  border-left: 0;
  border-top: 0;
}
.colorful-btn__container a:hover {
  background-color: plum;
  color: #fff;
  box-shadow: 0 0 50px plum;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  transition-delay: 0.4s;
}
.colorful-btn__container a:hover::before,
.colorful-btn__container a:hover::after {
  width: 138px;
  height: 58px;
  transition-delay: 0;
}
`;

const Container = container(style);

const ColorfulButton: Gallery.FC<GalleryChildrenProps> = ({ setHtml, setCss, className }) => {
	useEffect(() => {
		const html = document.getElementById('colorful-btn')?.innerHTML;
		setHtml(formatHtml(html!));
		setCss(formatCss(style));
	}, []);

	return (
		<Container className={`gallery-demo ${className ?? ''}`} id='colorful-btn'>
			<div className='colorful-btn__container'>
				{Array(5)
					.fill(null)
					.map((_, index) => (
						<a href='#' key={index} style={{ '--i': index + 1 } as React.CSSProperties}>
							Gallery
						</a>
					))}
			</div>
		</Container>
	);
};

ColorfulButton.updateTime = '01/15/2022';
export default ColorfulButton;

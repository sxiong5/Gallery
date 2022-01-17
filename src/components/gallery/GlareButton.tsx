import React, { useEffect } from 'react';
import { GalleryChildrenProps } from '../../@types/gallery';
import { formatHtml, formatCss } from '../../utils';
import container from '../Container';
import { flexCenter, resetAllBorderBox } from './common';

const style = `
${resetAllBorderBox}
.glare-button__container {
  ${flexCenter}
  position: relative;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.glare-btn__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.glare-btn__wrapper .glare-btn {
  position: relative;
  width: 200px;
  height: 60px;
  margin: 30px;
}
.glare-btn__wrapper .glare-btn button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  color: #fff;
  z-index: 1;
  font-weight: 400;
  letter-spacing: 1px;
  text-decoration: none;
  transition: 0.5s;
  overflow: hidden;
  backdrop-filter: blur(15px);
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
}
.glare-btn__wrapper .glare-btn:hover button {
  letter-spacing: 5px;
}
.glare-btn__wrapper .glare-btn button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15));
  transform: skewX(45deg) translateX(0);
  transition: 0.5s;
}
.glare-btn__wrapper .glare-btn:hover button::before {
  transform: skewX(45deg) translateX(200%);
}
.glare-btn__wrapper .glare-btn::before,
.glare-btn__wrapper .glare-btn::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 10px;
  background: var(--c);
  border-radius: 5px;
  box-shadow: 0 0 5px var(--c),
  0 0 15px var(--c),
  0 0 30px var(--c),
  0 0 60px var(--c);
  transition: 0.5s;
}
.glare-btn__wrapper .glare-btn::before {
  bottom: -5px;
}
.glare-btn__wrapper .glare-btn::after {
  top: -5px;
}
.glare-btn__wrapper .glare-btn:hover::before,
.glare-btn__wrapper .glare-btn:hover::after {
  height: 50%;
  width: 80%;
  border-radius: 15px;
  transition-delay: 0.3s;
}
.glare-btn__wrapper .glare-btn:hover::before {
  bottom: 0;
}
.glare-btn__wrapper .glare-btn:hover::after {
  top: 0;
}

`;

const Container = container(style);

const GlareButton: React.FC<GalleryChildrenProps> = ({ setHtml, setCss, className }) => {
	const colors = ['#12c2e9', '#c471ed', '#f64f59'];

	useEffect(() => {
		const html = document.getElementById('glare-btn')?.innerHTML;
		setHtml(formatHtml(html!));
		setCss(formatCss(style));
	}, []);

	return (
		<Container className={`gallery-demo ${className ?? ''}`} id='glare-btn'>
			<div className='glare-button__container'>
				<div className='glare-btn__wrapper'>
					{colors.map(item => (
						<div key={item} className='glare-btn' style={{ '--c': item } as React.CSSProperties}>
							<button>Gallery</button>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
};

export default GlareButton;

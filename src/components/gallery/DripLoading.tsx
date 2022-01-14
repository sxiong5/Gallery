import React, { useEffect } from 'react';
import { GalleryChildrenProps } from '../../@types/gallery';
import { formatCss, formatHtml } from '../../utils';
import container from '../Container';
import { flexCenter, resetAll } from './common';

const style = `
${resetAll}
.drip-loading__container {
  ${flexCenter}
  background-color: #8BC6EC;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
}
.drip-loading__wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  filter: url(#gooey);
}
svg {
  display: none;
}
.drip-loading__wrapper span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  animation: animate 4s ease-in-out infinite;
  animation-delay: calc(0.2s * var(--i));
}
.drip-loading__wrapper span::before {
  content: "";
  position: absolute;
  top: 0;
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(#d1f5ff, #1683ff);
  box-shadow: 0 0 30px #1683ff;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  50%, 100% {
    transform: rotate(360deg);
  }
}
`;

const Container = container(style);

const DripLoading: React.FC<GalleryChildrenProps> = ({ setHtml, setCss, className }) => {
	useEffect(() => {
		const html = document.getElementById('drip-loading')?.innerHTML;
		setHtml(formatHtml(html!));
		setCss(formatCss(style));
	}, []);

	return (
		<Container className={`gallery-demo ${className ?? ''}`} id='drip-loading'>
			<div className='drip-loading__container'>
				<div className='drip-loading__wrapper'>
					{Array(7)
						.fill(null)
						.map((_, index) => (
							<span key={index} style={{ '--i': index + 1 } as React.CSSProperties}></span>
						))}
				</div>
				<svg>
					<filter id='gooey'>
						<feGaussianBlur in='SourceGraphic' stdDeviation='10' />
						<feColorMatrix
							values='
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10
            '
						/>
					</filter>
				</svg>
			</div>
		</Container>
	);
};

export default DripLoading;

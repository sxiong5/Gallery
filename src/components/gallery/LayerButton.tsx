import React, { useEffect } from 'react';
import { Gallery, GalleryChildrenProps } from '../../@types/gallery';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import container from '../Container';
import { flexCenter, resetAllBorderBox } from './common';
import { formatCss, formatHtml } from '../../utils';

const style = `
${resetAllBorderBox}
.layer-btn__container {
  ${flexCenter}
  background-image: radial-gradient( circle 732px at -23.9% -25.1%,  rgba(30,39,107,1) 6.1%, rgba(188,104,142,1) 100.2% );
}
.layer-btn__container .layer-btn__wrapper {
  display: flex;
  cursor: pointer;
}
.layer-btn__wrapper .layer-btn {
  color: #fff;
  margin: 0 30px;
  position: relative;
}
.layer-btn__wrapper .layer-btn .layer {
  width: 70px;
  height: 70px;
  transition: 0.3s;
}
.layer-btn .layer i {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  border-radius: 6px;
  transition: 0.3s;
}
.layer-btn .layer .icon {
  font-size: 36px;
  text-align: center;
  line-height: 70px;
}
.layer-btn__wrapper .layer-btn .text {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  opacity: 0;
  transition: 0.3s;
}
.layer-btn__wrapper .layer-btn:hover .text {
  bottom: -35px;
  opacity: 1;
}
.layer-btn__wrapper .layer-btn:hover .layer {
  transform: rotate(-35deg) skew(20deg);
}
.layer-btn__wrapper .layer-btn:hover  i {
  opacity: calc(0.2 * (var(--i) + 1));
  transform: translate(calc(var(--i) * 5px), calc(var(--i) * -5px));
}
.layer-btn__wrapper .layer-btn:hover .layer i {
  box-shadow: -1px 1px 3px #fff;
}
`;

const Container = container(style);

const LayerButton: Gallery.FC<GalleryChildrenProps> = ({ setHtml, setCss, className }) => {
	const icons = [
		{ text: 'Twitter', component: TwitterIcon },
		{ text: 'Facebook', component: FacebookIcon },
		{ text: 'Isntagram', component: InstagramIcon },
		{ text: 'GitHub', component: GitHubIcon },
		{ text: 'Linkedin', component: LinkedInIcon }
	];

	useEffect(() => {
		const html = document.getElementById('layer-btn')?.innerHTML.replace(/<svg[\s\S]+?<\/svg>/g, '<!-- Your icon -->');
		setHtml(formatHtml(html!));
		setCss(formatCss(style));
	}, []);

	return (
		<Container className={`gallery-demo ${className ?? ''}`} id='layer-btn'>
			<div className='layer-btn__container'>
				<div className='layer-btn__wrapper'>
					{icons.map(item => (
						<div className='layer-btn' key={item.text}>
							<div className='layer'>
								{Array.from({ length: 4 }).map((_, index) => (
									<i
										className='layer-item'
										key={`${item.text}-${index}`}
										style={{ '--i': index } as React.CSSProperties}
									></i>
								))}
								<i style={{ '--i': 4 } as React.CSSProperties} className='icon'>
									<item.component fontSize='large' />
								</i>
							</div>
							<div className='text'>{item.text}</div>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
};

LayerButton.updateTime = '01/14/2022';

export default LayerButton;

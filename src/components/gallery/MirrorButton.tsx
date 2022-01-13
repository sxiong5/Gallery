import React, { useEffect } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { GalleryChildrenProps } from '../../@types/gallery';
import { formatCss, formatHtml } from '../../utils';
import container from '../Container';

const style = `
* {
  margin: 0;
  padding: 0;
  box-sizeing: border-box;
}
.mirror-btn__container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8EC5FC;
  background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
}
.mirror-btn__container::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
}
.mirror-btn__container ul {
  position: relative;
  display: flex;
  z-index: 2;
}
.mirror-btn__container ul li {
  position: relative;
  list-style: none;
  margin: 10px;
}
.mirror-btn__container ul li button {
  postition: relative;
  width: 80px;
  height: 80px;
  display: inline-block;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 32px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  transition: all 0.5s;
  overflow: hidden;
}
.mirror-btn__container ul li button:hover {
  transform: translateY(-20px);
}
.mirror-btn__container ul li button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  background: #fff;
  transform: skewX(45deg) translateX(150px);
  transition: all 0.5s;
}
.mirror-btn__container ul li button:hover::before {
  transform: skewX(45deg) translateX(-150px);
}
`;

const Container = container(style);

const MirrorButton: React.FC<GalleryChildrenProps> = ({ setHtml, setCss, className }) => {
	const icons = [
		<TwitterIcon fontSize='large' />,
		<FacebookIcon fontSize='large' />,
		<InstagramIcon fontSize='large' />,
		<GitHubIcon fontSize='large' />,
		<LinkedInIcon fontSize='large' />
	];

	useEffect(() => {
		const html = document.getElementById('mirror-btn')?.innerHTML.replace(/<svg[\s\S]+?<\/svg>/g, '<!-- Your icon -->');
		setHtml(formatHtml(html!));
		setCss(formatCss(style));
	}, []);

	return (
		<Container className={`gallery-demo ${className ?? ''}`} id='mirror-btn'>
			<div className='mirror-btn__container'>
				<ul>
					{icons.map((item, index) => (
						<li key={index}>
							<button>{item}</button>
						</li>
					))}
				</ul>
			</div>
		</Container>
	);
};

export default MirrorButton;

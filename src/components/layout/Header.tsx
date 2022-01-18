import React, { useEffect, useState } from 'react';
import { Badge, IconButton, ListItemText, Menu, MenuItem, Stack, styled, Link } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { RouteConfig } from '../../routes';
import dayjs from 'dayjs';
import GitHubIcon from '@mui/icons-material/GitHub';

interface HeaderProps {
	update: RouteConfig[];
	setDemoIndex: React.Dispatch<React.SetStateAction<number>>;
}

const HeaderWrapper = styled('header')(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	zIndex: theme.zIndex.appBar,
	margin: '15px'
}));

const Header: React.FC<HeaderProps> = ({ update, setDemoIndex }) => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [list, setList] = useState<RouteConfig[]>([]);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	useEffect(() => {
		const listData = update.sort((a, b) => {
			return dayjs(b.component.updateTime, 'MM/DD/YYYY').diff(dayjs(a.component.updateTime, 'MM/DD/YYYY'));
		});

		setList(listData);
	}, [update]);

	return (
		<HeaderWrapper>
			<Stack direction='row' alignItems='center' gap={2} sx={{ color: '#fff' }}>
				<IconButton color='inherit' onClick={handleOpenNavMenu}>
					<Badge badgeContent={list.length} color='primary'>
						<FiberNewIcon />
					</Badge>
				</IconButton>
				<Link color='inherit' href='https://github.com/sxiong5/Gallery'>
					<IconButton color='inherit'>
						<GitHubIcon />
					</IconButton>
				</Link>
			</Stack>
			<Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
				{list.map(item => (
					<MenuItem key={item.name} onClick={() => setDemoIndex(item.index)}>
						<ListItemText
							primaryTypographyProps={{ variant: 'body2' }}
							primary={item.name}
							secondary={`Update: ${item.component.updateTime}`}
						/>
					</MenuItem>
				))}
			</Menu>
		</HeaderWrapper>
	);
};

export default Header;

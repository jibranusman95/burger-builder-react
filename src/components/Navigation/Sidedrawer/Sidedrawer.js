import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.css';

const sidedrawer = (props) => {

	return (
		<div className={classes.Sidedrawer}>
			<Logo height='11%' marginBottom='32px' />
			<nav>
				<NavigationItems />
			</nav>
		</div>
	);
};

export default sidedrawer;

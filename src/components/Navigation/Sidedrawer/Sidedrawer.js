import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = (props) => {
	let attachedClasses = [classes.Sidedrawer];
	attachedClasses = props.open ? attachedClasses.concat(classes.Open) : attachedClasses.concat(classes.Closed);

	return (
		<Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<Logo height='11%' marginBottom='32px' />
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Fragment>
	);
};

export default sidedrawer;

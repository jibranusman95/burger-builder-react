import React, { Component, Fragment } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sidedrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	}

	sidedrawerToggleHandler = () => {
		this.setState((prevState) => {
			return ({ showSideDrawer: !prevState.showSideDrawer });
		});
	}

	render() {
		return(
			<Fragment>
				<Toolbar drawerToggleClicked={this.sidedrawerToggleHandler} />
				<Sidedrawer open={this.state.showSideDrawer} closed={this.sidedrawerClosedHandler} />
				<div>Toolbar, Sidebar, Backdrop</div>
				<main className={classes.content}>
					{this.props.children}
				</main>
			</Fragment>
		);
	}
}

export default Layout;

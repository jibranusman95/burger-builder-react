import React, { Fragment, Component } from 'react';

import Modal from '../Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		}

		componentDidMount(){
			axios.interceptors.request.use(req => {
				this.setState({ error: null });
			});

			axios.interceptors.response.use(null, error => {
				this.setState({ error: error });
			});
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		}

		render(){
			return(
				<Fragment>
					<Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
						Something didn't work!
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			);
		}
	}
}

export default withErrorHandler;

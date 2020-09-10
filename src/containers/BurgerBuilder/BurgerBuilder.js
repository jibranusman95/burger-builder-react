import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		loading: false,
	}

	addIngredientHandler = (type) => {
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = this.state.ingredients[type] + 1;

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		if ((this.state.ingredients[type] - 1) >= 0){
			const updatedIngredients = {
				...this.state.ingredients
			};
			updatedIngredients[type] = this.state.ingredients[type] - 1;

			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
			this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
			this.updatePurchaseState(updatedIngredients);
		}
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelledHandler = () => {
		this.setState({ purchasing: false });
	}

	purchaseContinueHandler = () => {
		this.setState({ loading: true });

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Jibran Usman',
				zipcode: '52400',
				country: 'Pakistan',
			},
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: true, purchasing: false });
			})
			.catch(error => {
				this.setState({ loading: true, purchasing: false });
			});
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchaseable: sum > 0 });
	}

	render(){
		const disabledInfo = {
			...this.state.ingredients
		};

		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = <OrderSummary
			price={this.state.totalPrice}
			ingredients={this.state.ingredients}
			purchaseCancelled={this.purchaseCancelledHandler}
			purchaseContinue={this.purchaseContinueHandler} />;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return(
			<Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					price={this.state.totalPrice}
					purchaseable={this.state.purchaseable}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					ordered={this.purchaseHandler} />
			</Fragment>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);

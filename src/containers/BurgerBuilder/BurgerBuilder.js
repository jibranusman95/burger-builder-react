import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchaseable: sum > 0 })
	}

	render(){
		const disabledInfo = {
			...this.state.ingredients
		};

		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return(
			<Fragment>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					price={this.state.totalPrice}
					purchaseable={this.state.purchaseable}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo} />
			</Fragment>
		);
	}
}

export default BurgerBuilder;

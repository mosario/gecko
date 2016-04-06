import React, { Component, findDOMNode } from 'react';
import {TextField, RaisedButton} from 'material-ui';
import IconButton from 'material-ui/lib/icon-button';
import ArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import DropDown from './drop_down';
import EditCategories from './edit_categories';

const style = {
	main: {
		width: '90%',
		display: 'flex',
		margin: '0 auto'
	},
	text_field: {
		width: '100%',
		top: 4
	},
	button: {
		marginTop: 8,
		marginLeft: 10
	},
	arrow: {
		position:'absolute',
		marginTop: 5
	}
};

export default class Form extends Component{
	constructor(props){
		super(props);
		this.state = {
			error: 0,
			text: '',
			drop_down: 2,
			dialog: false,
			categories: this.props.categories
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		let value = this.refs.href.getValue();
		if(value == ''){
			this.setState({
				error: 1,
				text: 'Sorry, this field is empty',
			});
		}else{
			this.setState({
				error: 0,
				text: value
			});
			this.props.send(value, this.state.drop_down);
		}
		this.refs.href.clearValue();
	}

	handleDropDown = (drop_down) => {this.setState({drop_down: drop_down})}
	
	handleDialog = () => {this.setState({dialog:!this.state.dialog})}

	handleUpdateCategories = () => this.props.categoriesUpdate()

	componentWillReceiveProps = (nextState) => this.setState({categories: nextState.categories})

	render(){
		let categories = this.state.categories;
		return <div style={style.main}>

				<EditCategories 
					open={this.state.dialog}
					handleDialog={::this.handleDialog}
					categories={categories}
					update={::this.handleUpdateCategories}
					snackbar={this.props.snackbar} />

				<TextField 
					ref="href"
					hintText="Item link"
					errorText={this.state.error ? this.state.text : ''}
					style={style.text_field} />

				<DropDown 
					categories={categories}
					select={::this.handleDropDown} 
					dialog={::this.handleDialog} />

				<RaisedButton
					label="Add" 
					style={style.button} 
					onClick={::this.handleClick} />
			</div>
	}
}
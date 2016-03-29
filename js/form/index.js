import React, { Component, findDOMNode } from 'react';
import {TextField, RaisedButton} from 'material-ui';
import DropDown from './drop_down';

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
	}
};

export default class Form extends Component{
	constructor(props){
		super(props);
		this.state = {
			error: 0,
			text: '',
			drop_down: 2
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

	render(){
		return <div style={style.main}>
				<TextField 
					ref="href"
					hintText="Item link"
					errorText={this.state.error ? this.state.text : ''}
					style={style.text_field} />

				<DropDown select={this.handleDropDown.bind(this)} />

				<RaisedButton 
					label="Add" 
					style={style.button} 
					onClick={this.handleClick.bind(this)} />
			</div>
	}
}
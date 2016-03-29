import React, {Component} from 'react';
import {MenuItem,DropDownMenu} from 'material-ui';
import {categories} from '../query';

const style = {
	height: 44
};

export default class DropDown extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: 2,
			primaryText: categories()
		};
	}
	handleDropDown = (event, index, value) => {
		let id = this.state.primaryText[index].id;
		this.props.select(id);
		this.setState({value: id});
	};
	render(){
		let text = this.state.primaryText;
		return <DropDownMenu 
				value={this.state.value} 
				onChange={this.handleDropDown}
				style={style}>
			{Object.keys(text).map((e, i) =>
				<MenuItem value={text[i].id} key={i} primaryText={text[i].name}/>
			)}
	      </DropDownMenu>
	}
}
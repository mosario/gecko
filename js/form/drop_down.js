import React, {Component} from 'react';
import { MenuItem, DropDownMenu, Divider } from 'material-ui';

const style = {
	height: 44
};

export default class DropDown extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: 2,
			primaryText: this.props.categories
		};
	}
	handleDropDown = (event, index, value) => {
		if(value == 'add') return this.handleDialog();
		let id = this.state.primaryText[index].id;
		this.props.select(id);
		this.setState({value: id});
	};

	handleDialog = () => this.props.dialog();

	componentWillReceiveProps = (categories) => this.setState({primaryText: categories.categories})

	render(){
		let text = this.state.primaryText;
		return <DropDownMenu 
				value={this.state.value} 
				onChange={this.handleDropDown}
				style={style}>
			{Object.keys(text).map((e, i) =>
				<MenuItem key={i} value={text[i].id} primaryText={text[i].name} />
			)}
			<Divider />
			<MenuItem value="add" primaryText="Edit categories list" />
	      </DropDownMenu>
	}
}
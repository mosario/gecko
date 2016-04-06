import React, { Component } from 'react';
import { filtered } from '../query';

export default class Filter extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: this.props.categories
		}
	}

	handleClick = (e) => this.props.filter(filtered(e), e);

	componentWillReceiveProps = (categories) => this.setState({data: categories.categories})

	render(){
		let current = this.props.filtered;
		let data = this.state.data;
		return <div>
			<ul className="filter">
				<span>Filter:</span>
				<li onClick={this.handleClick.bind(this,0)}>All</li>
				{Object.keys(data).map((e, i) =>
					<li value={data[i].id} key={i}
						onClick={this.handleClick.bind(this,data[i].id)}>{data[i].name}</li>
				)}
			</ul>
		</div>
	}
}
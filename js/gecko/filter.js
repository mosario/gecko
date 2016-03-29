import React, { Component } from 'react';
import { categories, filtered } from '../query';

export default class Filter extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: categories()
		}
	}

	handleClick = (e) => this.props.filter(filtered(e), e);

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
import React, {Component} from 'react';
import {Popover} from 'material-ui';

export default class PopOver extends Component{
	constructor(props){
		super(props);
		this.state = {
	      open: false,
	    };
	}
	handleTouchTap = (event) => {
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};
	render(){
		let sizes = this.props.sizes;
		return <div>
			<div 
				onTouchTap={this.handleTouchTap} id="ring_sizes">Ring Sizes</div>
      		<Popover
	          open={this.state.open}
	          anchorEl={this.state.anchorEl}
	          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
	          targetOrigin={{horizontal: 'left', vertical: 'top'}}
	          onRequestClose={this.handleRequestClose}
	        >
	          <div>
	           	<ul className="pop_over">
	           	{Object.keys(sizes).map((e,i) =>
	           		<li key={i}>
	           			<span>{sizes[e].size}</span>
	           			<span>{sizes[e].state}</span>
	           		</li>
	           	)}
	           	</ul>
	          </div>
	        </Popover>
		</div>
	}
}
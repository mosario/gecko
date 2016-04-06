import React, { Component } from 'react';

import {Avatar} from 'material-ui';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import $ from 'jquery';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import IconButton from 'material-ui/lib/icon-button';
import PopOver from './pop_over';
import {deleted} from '../query';

const style = {
	href: {
		position: 'relative',
		top: -45,
		left: 15
	},
	img: {
		width: 100,
    	height: 100,
    	paddingTtop: 10
	}
}

export default class TableExampleSimple extends Component{
	constructor(props){
		super(props);
		this.state = {
			categories: this.props.categories
		}		
	}
	handleDelete(i){
		if(deleted(i)){
			this.props.update();
			this.props.snackbar('deleted');
		}else{
			this.props.snackbar('error');
		}
	}

	componentWillReceiveProps = (nextState) => this.setState({categories: nextState.categories})

	render(){
		let data = this.props.data;
		let categories = this.state.categories;
		return <Table>
	    <TableHeader 
	    	displaySelectAll={false}
	    	adjustForCheckbox={false}
	    	enableSelectAll={false}
	    	>
	      <TableRow>
	        <TableHeaderColumn>Item</TableHeaderColumn>
	        <TableHeaderColumn>Type</TableHeaderColumn>
	        <TableHeaderColumn>Stock</TableHeaderColumn>
	        <TableHeaderColumn style={{width:'10%'}}>Delete</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody displayRowCheckbox={false}>	      
	      {Object.keys(data).map((e, i) => 
	      	<TableRow key={i}>
		      	<TableRowColumn>
		      		<img style={style.img} src={data[e].image} />
		      		<a style={style.href} href={data[e].url}>{data[e].name}</a>
		      	</TableRowColumn>

		      	<TableRowColumn>
		      		{Object.keys(categories).map((key) => 
		      			<p key={key}>{categories[key].id == data[e].category ? categories[key].name : ''}</p>
		      		)}
		      	</TableRowColumn>

		      	<TableRowColumn>
		      		{data[e].state == 'Ring Sizes' ?  
		      			<PopOver sizes={data[e].ring_sizes}/> : 
		      		data[e].state}
		      	</TableRowColumn>

		      	<TableRowColumn style={{width:'10%', paddingLeft:15}}>
		      		<IconButton onClick={this.handleDelete.bind(this, data[e].id)}>
		      			<ActionDelete/>
		      		</IconButton>
		      	</TableRowColumn>
	      	</TableRow>
			)}	      
	    </TableBody>
	  </Table>
	}
}


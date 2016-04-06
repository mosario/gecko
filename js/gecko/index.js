import React, { Component } from 'react';
import { RaisedButton, TextField, Paper, LinearProgress, Snackbar } from 'material-ui';
import $ from 'jquery';
import Form from '../form';
import TableExampleSimple from './table';
import Message from './message';
import Filter from './filter';
import { categories, getAll, filtered } from '../query';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const style = {
	paper: {
		height: 'auto',
		textAlign: 'center',
		width: '82%',
		margin: '0 auto'
	},
};
export default class App extends Component{
	constructor(){
		super();
		this.state = {
			status: '',
			message: '',
			open: false,
			data: getAll(),
			categories: categories(),
			progress: false,
			drop_down: '',
			filtered: 0
		}
		this.updateList = this.updateList.bind(this);
	}
	handleForm(url, category){
		this.handleProgress();
		let data = {
			url: url,
			category: category			
		};
		$.ajax({
			type: 'POST',
			url: '/api/products/',
			data: JSON.stringify(data),
			async:true,
			contentType: "application/json",
			dataType: 'json',
			success: function(data){
				this.setState({
					open: true,
					message: 'Your item has been successfully added',
					data: getAll(),
					progress: false
				});
			}.bind(this),
			error: function(status){
				let json = JSON.parse(status.responseText);
				this.setState({
					open: true,
					message: json.url[0],
					progress: false
				});
			}.bind(this)
		});
	}
	updateList(){
		let id_filtered = this.state.filtered;
		this.setState({
			data: id_filtered != 0 ? filtered(id_filtered) : getAll()
		});
	}
	handleSnackbarClose = () => {this.setState({open: false})}

	handleProgress = () => {this.setState({progress: !this.state.progress})} 

	handleFilter = (data, key) => {this.setState({data: data, filtered: key})}

	handleSnackbarStatus = (message) => {
		this.setState({
		   open: !this.state.open,
		   message: message
		});
	}
	
	categoriesUpdate = () => this.setState({categories: categories()})

	render(){
		let categories = this.state.categories;
		return <Paper style={style.paper} zDepth={1}>
			{this.state.progress ? <LinearProgress mode="indeterminate"/> : ''}
			
			<Form 
				send={::this.handleForm}
				snackbar={::this.handleSnackbarStatus}
				categories={categories}
				categoriesUpdate={::this.categoriesUpdate} />

			<Filter 
				categories={categories}
				filter={::this.handleFilter} />

			<TableExampleSimple 
				data={this.state.data} 
				update={this.updateList.bind(this)}
				categories={categories}
				snackbar={this.handleSnackbarStatus.bind(this)}	 />

	        <Message 
	        	open={this.state.open}
	        	message={this.state.message} 
	        	close={this.handleSnackbarClose.bind(this)} />
			</Paper>
	}
}
import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

export default class Categories extends Component{
	render(){
		return <div className="category">
			<p>Categories setting:</p>
			<div className="category-form">
				<TextField 
					ref="href"
					hintText="Item category" />
				<RaisedButton
					label="Add"
					style={{marginLeft:10}} />
			</div>
		</div>
	}
}
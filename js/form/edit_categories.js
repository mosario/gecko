import React from 'react';
import {TextField, RaisedButton, FlatButton, Dialog} from 'material-ui';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import IconButton from 'material-ui/lib/icon-button';
import { addCategories, deletedCategories } from '../query';

export default class EditCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAdd = () => {
  	let value = this.refs.category.getValue();
    if(addCategories(value)){
      if(this.props.categories.length == 0){
        this.props.snackbar('Congratulations, you added the first category');
      }else{
        this.props.snackbar('Category Added');
      }
      this.props.update();
      this.props.handleDialog();
    }else{
      this.props.snackbar('Sorry, trouble with added.');
    }
  }

  handleDelete = (i) => {
    if(deletedCategories(i)){
      this.props.update();
      this.props.snackbar('Category deleted');
    }else{
      this.props.snackbar('Sorry, trouble with the removal.');
    }
  }
  handleClose = () => this.props.handleDialog()

  render(){
    const actions = [
    <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose} />
    ];
    let categories = this.props.categories;
    return <div>
       <Dialog
          title="Edit categories list"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}>
          <TextField 
          	ref="category"
            style={{width:'82%'}}
          	hintText="Category name" />
          <RaisedButton 
            label="Add" style={{marginLeft:'5%'}}
            onClick={::this.handleAdd} />

          <Table height="200px" fixedHeader={true}>
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
              >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn style={{width:'10%'}}>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {Object.keys(categories).map((i) => 
              <TableRow key={i}>

              <TableRowColumn>{categories[i].name}</TableRowColumn>

              <TableRowColumn style={{width:'10%', paddingLeft:15}}>
                <IconButton onClick={this.handleDelete.bind(this, categories[i].id)}>
                  <ActionDelete/>
                </IconButton>
              </TableRowColumn>

            </TableRow>
            )}
          </TableBody>
          </Table>
        </Dialog>
      </div>
  }
}
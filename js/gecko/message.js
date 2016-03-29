import React from 'react';
import { Snackbar } from 'material-ui';

export default class Message extends React.Component {

  handleRequestClose = () => this.props.close();

  render(){
    return <Snackbar
            open={this.props.open}
            message={this.props.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose} />
  }
}
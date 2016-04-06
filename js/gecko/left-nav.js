import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ActionGrade from 'material-ui/lib/svg-icons/action/list';

export default class LeftNavUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
      	<IconButton 
      		onTouchTap={this.handleToggle} touch={true}
      		style={{position:'absolute',right:30, top:25}}>
	      <ActionGrade />
	    </IconButton>

        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose}>Welcom, Username</MenuItem>
        </LeftNav>
      </div>
    );
  }
}
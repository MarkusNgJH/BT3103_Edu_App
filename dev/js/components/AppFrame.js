import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Menu from 'material-ui/Menu'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import MenuIcon from 'material-ui-icons/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import AppDrawer from './AppDrawer';

class AppFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownAnchorEl: null,
            dropdownMenuOpen: false,
        };
    }
      
    render() {
        return (
            <div>
                <AppBar
                    title="Title"
                    iconElementRight={
                        <IconButton>
                            <ActionHome />
                        </IconButton>}
                />
                <AppDrawer/>
            </div> 
        )
    }
}

export default AppFrame;
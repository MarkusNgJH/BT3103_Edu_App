import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui-icons/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import AppDrawer from './AppDrawer';

class AppFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            dropdownAnchorEl: null,
            dropdownMenuOpen: false,
        };
    }

    handleDrawerClose() {
        this.setState({ menuOpen: false });
    };

    handleDrawerToggle() {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconButton
                            color="contrast"
                            aria-label="Open Drawer"
                            onClick={this.handleDrawerToggle.bind(this)}
                        >
                            <MenuIcon />
                        </IconButton>

                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Options" />
                        <FontIcon className="muidocs-icon-custom-sort" />
                        <ToolbarSeparator />
                        <RaisedButton label="Create Broadcast" primary={true} />
                        <IconMenu
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }
                        >
                            <MenuItem primaryText="Download" />
                            <MenuItem primaryText="More Info" />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
}

export default AppFrame;
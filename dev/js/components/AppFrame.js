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
import Hidden from 'material-ui/Hidden'
import AppDrawer from './AppDrawer';

const styles = theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            boxSizing: 'border-box',
        },
        '*, *:before, *:after': {
            boxSizing: 'inherit',
        },
        body: {
            height: '100%',
            margin: 0,
        },
        'div[id=root]': {
            height: '100%'
        },
    },
    root: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100%',
        width: '100%',
    },
    appBarTitle: {
        flex: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - ' + APP_SETTING.DrawerWidth + 'px)',
        },
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: APP_SETTING.DrawerWidth,
        },
    },
    content: {
        width: '100%',
        padding: theme.spacing.unit,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - ' + APP_SETTING.DrawerWidth + 'px)',
        },
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
            padding: theme.spacing.unit * 3,
        },
    },
});

class AppFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileDrawerOpen: false,
            dropdownAnchorEl: null,
            dropdownMenuOpen: false,
        }
    }

    handleDrawerClose(){
        this.setState({ mobileDrawerOpen: false });
    };

    handleDrawerToggle() {
        this.setState({ mobileDrawerOpen: !this.state.mobileDrawerOpen });
    };

    handleMenuOpen() {
        this.setState({ dropdownMenuOpen: true, dropdownAnchorEl: event.currentTarget });
    };

    handleMenuclose() {
        this.setState({ dropdownMenuOpen: false });
    };

    render() {
        const { children, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Hidden lgUp implementation="css">
                                <IconButton
                                    color="contrast"
                                    aria-label="Open Drawer"
                                    onClick={this.handleDrawerToggle.bind(this)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <Typography className={classes.appBarTitle} type="title" color="inherit" noWrap>
                                Firebase and Redux
                </Typography>
                            <IconButton
                                aria-label="More"
                                aria-owns="Open right Menu"
                                aria-haspopup="true"
                                onClick={this.handleMenuOpen.bind(this)}
                                className={classes.menuButtonRight}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Menu
                                id="menuRight"
                                anchorEl={this.state.dropdownAnchorEl}
                                open={this.state.dropdownMenuOpen}
                                onRequestClose={this.handleMenuclose}
                            >
                                <AppBarMenuItemsExport onClick={this.handleMenuclose.bind(this)} />
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <AppDrawer
                        className={classes.drawer}
                        onRequestClose={this.handleDrawerClose}
                        mobileDrawerOpen={this.state.mobileDrawerOpen}
                    />
                    <main className={classes.content}>
                        {children}
                    </main>
                </div>
            </div>
        )
    }
}

AppFrame.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFrame);
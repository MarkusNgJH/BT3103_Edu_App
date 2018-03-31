import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import ToolbarSeparator from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import StarIcon from 'material-ui-icons/Star';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Hidden from 'material-ui/Hidden';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    flex: {
        flex: 1,
    },
});

class PersistentDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            auth: true,
            anchorEl: null,
        }
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, theme } = this.props;
        // Drawer stuffs
        const { auth, anchorEl } = this.state;
        const menuOpen = Boolean(anchorEl);

        const drawer = (
            <div>
                <List>
                    <ListItem button onClick={this.handleDrawerToggle.bind(this)}>
                        <Link to="/">
                            <ListItemIcon><StarIcon /></ListItemIcon>
                            <ListItemText primary="The New Boston" />
                        </Link>
                    </ListItem>
                    <ListItem button onClick={this.handleDrawerToggle.bind(this)}>
                        <Link to="/page2" >
                            <ListItemIcon><StarIcon /></ListItemIcon>
                            <ListItemText primary="Page 2" />
                        </Link>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar
                    className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle.bind(this)}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        
                        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                            Edu App
                            </Typography>
                        <ToolbarSeparator />
                        User ID: {this.props.uid}
                        <ToolbarSeparator />
                        Email: {this.props.email}
                        <ToolbarSeparator />
                        View: {this.props.view}
                        {/* The profile settings, logout menu */}
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={menuOpen ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={menuOpen}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem>
                                        <Link to="/profileSetting" >
                                        Profile Settings    
                                        </Link>    
                                    </MenuItem>
                        
                                    <MenuItem onClick={this.props.changeLogOut}>Log out</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>

                <Hidden mdUp>>
                        <Drawer
                        variant="temporary"
                        anchor="left"
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle.bind(this)}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerToggle.bind(this)}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        {drawer}
                    </Drawer>
                </Hidden>

                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
<<<<<<< HEAD
import { MenuItem } from 'material-ui/Menu';
=======
import ToolbarSeparator from 'material-ui/Toolbar';
>>>>>>> add8a59c34f594606f90a4bd3ea81058055304e8
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import StarIcon from 'material-ui-icons/Star';

const drawerWidth = 240;

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
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    content: {
        width: '100%',
        padding: theme.spacing.unit,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        // [theme.breakpoints.up('lg')]: {
        //     width: 'calc(100% - ' + drawerWidth + 'px)',
        // },
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
            padding: theme.spacing.unit * 3,
        },
    },
});

class PersistentDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        const drawer = (
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose.bind(this)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={this.handleDrawerClose.bind(this)}>
                        <Link to="/">
                            <ListItemIcon><StarIcon /></ListItemIcon>
                            <ListItemText primary="The New Boston" />
                        </Link>
                    </ListItem>
                    <ListItem button onClick={this.handleDrawerClose.bind(this)}>
                        <Link to="/page2" >
                            <ListItemIcon><StarIcon /></ListItemIcon>
                            <ListItemText primary="Page 2" />
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        );

        return (
            <div className={classes.root}>
<<<<<<< HEAD
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
=======
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
>>>>>>> add8a59c34f594606f90a4bd3ea81058055304e8
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen.bind(this)}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                Edu App
              </Typography>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main className={classes.content}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
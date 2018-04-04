import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
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
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import AppFrameItems from './AppFrameItems';
import ActiveUserInfo from './activeUserInfo';
import store from '../store';

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

class AppFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            auth: true,
            anchorEl: null,
            overviewOpen: false,
        }
        this.charts = ["chart 1", "chart 2", "chart 3"]
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    handleDrawerToggleNested() {
        this.setState({ overviewOpen: !this.state.overviewOpen });
    };

    // functions for user account menu 
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        const { auth, anchorEl } = this.state; // for user account menu
        const menuOpen = Boolean(anchorEl); // for user account menu
        const { overviewOpen } = this.state;
        const storeState = store.getState();

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
                <AppFrameItems
                    handleDrawerToggleNested={this.handleDrawerToggleNested.bind(this)}
                    handleDrawerClose={this.handleDrawerClose.bind(this)}
                    overviewOpen={this.state.overviewOpen}
                    charts={this.charts}
                    activeProfileRole={storeState.activeProfile.val.role}
                />
            </Drawer>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
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
                            <Typography variant="title" color="inherit" style={{ flex: 1 }} noWrap>
                                <Link to="/" >
                                <span style={{color: 'white'}}>Edu App</span>
                                </Link>
                            </Typography>
                            <ActiveUserInfo />
                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={menuOpen ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                        style={{ right: '20px' }}
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
                                        <MenuItem onClick={this.handleClose}>
                                            <Link to="/profilesetting" >
                                                Profile Settings
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={this.props.logout.bind(this)}>Log Out</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main className={classes.content}>
                        {this.props.body}
                    </main>
                </div>
            </div>
        );
    }
}

AppFrame.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppFrame);
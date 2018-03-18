import React from 'react';
import PropTypes from "prop-types";

import withStyles from "material-ui/styles/withStyles";
import Drawer from "material-ui/Drawer";
import Hidden from "material-ui/Hidden";

import IconButton from "material-ui/IconButton";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import { Color } from 'material-ui'
import { AppDrawerElements } from './AppDrawerElements'
import { APP_SETTING } from "./config";

const styles = theme => ({
    paper: {
        width: APP_SETTING.DrawerWidth,
        backgroundColor: theme.palette.background.paper
    },
    anchor: {
        color: theme.palette.text.secondary
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
    }
});

function AppDrawer(props, context) {
    const { classes, className, mobileDrawerOpen, onRequestClose } = props;

    const drawer = (
        <div>
            <div className={classes.drawerHeader}>
                <Hidden lgUp implementation="css">
                    <IconButton onClick={onRequestClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Hidden>
            </div>
            {AppDrawerElements}
        </div>
    );

    return (
        <div className={className}>
            <Hidden lgUp>
                <Drawer
                    classes={{
                        paper: classes.paper
                    }}
                    type="temporary"
                    open={mobileDrawerOpen}
                    onRequestClose={onRequestClose}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>

            <Hidden lgDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.paper
                    }}
                    type="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    mobileDrawerOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AppDrawer);
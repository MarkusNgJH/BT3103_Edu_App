import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { DrawerItems } from './DrawerItems'

const styles = theme => ({
    paper: {
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

class AppDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle() {
        this.setState({ open: !this.state.open });
    }
    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem primaryText="Menu item 1" leftIcon={<ContentInbox />} />
                    <ListItem primaryText="Menu item 2" leftIcon={<ActionGrade />} />
                    <ListItem primaryText="Menu item 3" leftIcon={<ContentSend />} />
                    <ListItem primaryText="Menu item 4" leftIcon={<ContentDrafts />} />
                    <ListItem primaryText="Menu item 5" leftIcon={<ContentInbox />} />
                </List>
            </Drawer>
        );
        return (
            <div>
            </div>
        );
    }
}

export default AppDrawer
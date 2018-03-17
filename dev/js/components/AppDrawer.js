import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { DrawerItems } from './DrawerItems'

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
        return (
            <div>
                <RaisedButton
                    label="Toggle Drawer"
                    onClick={this.handleToggle.bind(this)}
                />

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    {DrawerItems}
                    {/* <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem> */}
                </Drawer>
            </div>
        );
    }
}

export default AppDrawer
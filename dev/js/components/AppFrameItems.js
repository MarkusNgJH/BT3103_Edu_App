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


class DrawerItems extends React.Component {
    constructor(props) {
        super(props);
        this.charts = this.props.charts
    }

    render() {
        const { overviewOpen } = this.props.overviewOpen;

        const mapStructure = (nodes) => {
            if (nodes) {
                return nodes.map((node, id) => (
                    <ListItem button onClick={this.props.handleDrawerClose.bind(this)}>
                        <ListItemText primary={node} key={id} />
                    </ListItem>
                ));
            }
        };

        return (
            <List>
                <ListItem button onClick={this.props.handleDrawerToggleNested.bind(this)}>
                    <Link to="/">
                        <ListItemIcon><StarIcon /></ListItemIcon>
                        <ListItemText primary="Homepage" />
                    </Link>
                    {this.props.overviewOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.props.overviewOpen} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ left: "30%" }}>
                            <ListItemText primary={this.charts[0]} />
                        </ListItem>
                        <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ left: "30%" }}>
                            <ListItemText primary={this.charts[1]} />
                        </ListItem>
                        <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ left: "30%" }}>
                            <ListItemText primary={this.charts[2]} />
                        </ListItem>

                        {
                            this.charts.map(function (chart, i) {
                                var t = { chart }.chart
                                // console.log("value:", t, "index:", i)
                                return
                                (
                                    <ListItem button onClick={this.props.handleDrawerClose.bind(this)}>
                                        <ListItemText primary={t} key={i} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Collapse>

                <ListItem button onClick={this.props.handleDrawerClose.bind(this)}>
                    <Link to="/mydashboard" >
                        <ListItemIcon><StarIcon /></ListItemIcon>
                        <ListItemText primary="My Dashboard" />
                    </Link>
                </ListItem>

            </List>
        );
    }
}

export default DrawerItems;
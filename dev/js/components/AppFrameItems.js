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
import instructorAssignmentType from './instructorAssignmentType';
import instructorAssignmentCat from './instructorAssignmentCat';
import instructorStudentIdentifier from './instructorStudentIdentifier';
import administratorActivity from './administratorActivity';
import administratorPerformance from './administratorPerformance';
import StudentAssignment from './studentAssignment';
import StudentAssignmentType from './studentAssignmentType';


class DrawerItems extends React.Component {
    constructor(props) {
        super(props);
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
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h4 style={{ color: "#FFFFFF" }}>Homepage</h4>
                    </Link>
                    {this.props.overviewOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.props.overviewOpen} timeout="auto" unmountOnExit style={{ backgroundColor: "#FFBF00", color: "#FFF" }}>

                    {this.props.activeProfileRole == 'Administrator' ?
                        <List disablePadding >
                            <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                <Link to="/administratorPerformance" style={{ textDecoration: "none" }}>
                                    <ListItemText primary="Administrator Performance" />
                                </Link>
                            </ListItem>
                            <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                <Link to="/administratorActivity" style={{ textDecoration: "none" }}>
                                    <ListItemText primary="Administrator Activity" />
                                </Link>
                            </ListItem>
                        </List>
                        :
                        this.props.activeProfileRole == 'Instructor' ?
                            <List disablePadding >
                                {/* <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px", background: 1==1 ? "#4b9aea" : ""}}> */}
                                <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                    <Link to="/instructorAssignmentType" style={{ textDecoration: "none" }}>
                                        <h4 style={{ color: "#FFFFFF" }}>Instructor Assignment Type</h4>
                                    </Link>
                                </ListItem>

                                <Divider />

                                <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                    <Link to="/instructorAssignmentCat" style={{ textDecoration: "none" }}>
                                        <h4 style={{ color: "#FFFFFF" }}>Instructor Assignment Cat</h4>
                                    </Link>
                                </ListItem>

                                <Divider />

                                <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                    <Link to="/instructorStudentIdentifier" style={{ textDecoration: "none" }}>
                                        <h4 style={{ color: "#FFFFFF" }}>Instructor Student Identifier</h4>
                                    </Link>
                                </ListItem>
                            </List>
                            :
                            <List disablePadding>
                                <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                    <Link to="/StudentAssignment" style={{ textDecoration: "none" }}>
                                        <ListItemText primary="Student Assignment" />
                                    </Link>
                                </ListItem>
                                <ListItem button onClick={this.props.handleDrawerClose.bind(this)} style={{ paddingLeft: "60px" }}>
                                    <Link to="/StudentAssignmentType" style={{ textDecoration: "none" }}>
                                        <ListItemText primary="Student Assignment Type" />
                                    </Link>
                                </ListItem>
                            </List>
                    }
                </Collapse>

                <Divider />

                <ListItem button onClick={this.props.handleDrawerClose.bind(this)} >
                    <Link to="/mydashboard" style={{ textDecoration: "none" }}>
                        <h4 style={{ color: "#FFFFFF" }}>My Dashboard</h4>
                    </Link>
                </ListItem>

            </List>
        );
    }
}

export default DrawerItems;
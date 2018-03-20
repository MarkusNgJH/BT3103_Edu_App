import React from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { MenuItem } from 'material-ui/Menu';
import StarIcon from 'material-ui-icons/Star';

export const AppDrawerElements = (
    <div>
        <List>
            <ListItem button>
                <Link to="/">
                    <ListItemIcon><StarIcon /></ListItemIcon>
                    <ListItemText primary="The New Boston" />
                </Link>
            </ListItem>
            <ListItem button>
                <Link to="/page2">
                    <ListItemIcon><StarIcon /></ListItemIcon>
                    <ListItemText primary="Page 2" />
                </Link>
            </ListItem>
        </List>
    </div>
)
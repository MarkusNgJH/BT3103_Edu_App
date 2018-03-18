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
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="Item 2" />
            </ListItem>
        </List>
    </div>
)
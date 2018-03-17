import React from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { MenuItem } from 'material-ui/Menu';
import StarIcon from 'material-ui-icons/Star';

export const DrawerItems = (
    <div>
        <List>
            <ListItem button>
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="ReCharts" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="Victory" />
            </ListItem>
        </List>
    </div>
)
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import PhotoCamera from 'material-ui-icons/PhotoCamera';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  subheader: {
    width: '100%',
  },
});

const tilesData = [
  {
    img: 'Chart 1'
  },
  {
    img: 'Chart 2'
  },
  {
    img: 'Chart 3'
  },
  {
    img: 'Chart 4',
  },
  {
    img: 'Chart 5'
  },
  {
    img: 'Chart 6'
  },
  {
    img: 'Chart 7'
  },
];

function ImageGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tilesData.map(tile => (
          <GridListTile cols={tile.cols || 1} key={tile.img}>
            <span>{tile.img}</span>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);

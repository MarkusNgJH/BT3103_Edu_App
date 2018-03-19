import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import Dashboard from '../components/dashboard';
import { type } from 'os';

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
    id: '1',
    img: 'Chart 1'
  },
  {
    id: '2',
    img: 'Chart 2'
  },
  {
    id: '3',
    img: 'Chart 3'
  },
  {
    id: '4',
    img: 'Chart 4',
  },
  {
    id: '5',
    img: 'Chart 5'
  },
  {
    id: '6',
    img: 'Chart 6'
  },
  {
    id: '7',
    img: 'Chart 7'
  },
];

function ImageGridList(props) {
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tilesData.map(tile => (
          <GridListTile key={tile.id} cols={tile.cols || 1}>
            <span>
              <h3>Level:{tile.level}</h3>
              <p>Players:{tile.numPlayers}</p>
              {tile.img}
            </span>
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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from '../../axios';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Review(props) {


    const [data, setData] = React.useState(
        [
           
        ]
       
      );
  const classes = useStyles();

  React.useEffect(() => {
    console.log("jsdkds")
    // Update the document title using the browser API
    axios.get('/bookings').then((res) => {
    console.log("TCL: Categories -> res", res)
    //   const newState = {columns: err.columns, data: res.data.data}
    setData(res.data.bookings);
      // setColumn(columns[0].lookup = { 34: 'İstanbulsss', 63: 'Şanlıurfa' })
    });
  }, []);

  return (
    <React.Fragment>
            <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Resolute AI
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
         
        </GridListTile>
        {data.map((booking) => (
          <GridListTile key={booking.img}>
            <img src={booking.doctor.img} alt={booking.doctor.name} />
            <GridListTileBar
              title={booking.doctor.name}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </React.Fragment>
  );
}
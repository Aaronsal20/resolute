import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
// import Pagination from '@material-ui/lab/Pagination';
import axios from '../../axios';
import { useHistory } from "react-router-dom"

const usePaginationStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));



export default function Album() {
  const history = useHistory();
  const [data, setData] = React.useState(
    [
       
    ]
   
  );

  const bookDoctor = (id) => {
    console.log("bookDoctor -> id", id)
    const payload = {
      id: id
    }
    axios.post('/book', payload).then(r => {
      history.push("/booking")
    })

  }


  const classes = useStyles();
  const pagClasses = usePaginationStyles();

  React.useEffect(() => {
    console.log("jsdkds")
    // Update the document title using the browser API
    axios.get('/doctors').then((res) => {
    console.log("TCL: Categories -> res", res)
    //   const newState = {columns: err.columns, data: res.data.data}
    setData(res.data.doctors);
      // setColumn(columns[0].lookup = { 34: 'İstanbulsss', 63: 'Şanlıurfa' })
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Resolute AI
          </Typography>
          <Button color="#fff" variant="outlined" className={classes.link}>
          Bookings
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {card.name}
                    </Typography>
                    <Typography>
                     {card.phone}
                     <br></br>
                     {card.address}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={ () => bookDoctor(card._id)}>
                      Book
                    </Button>
                    
                  </CardActions>
                </Card>
                {/* <div className={classes.root}> */}
    
    {/* </div> */}
              </Grid>
            ))}
          </Grid>
          <div className={pagClasses.root}>
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </div>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
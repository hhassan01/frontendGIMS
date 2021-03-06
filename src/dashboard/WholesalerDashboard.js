import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
//import { mainListItems, secondaryListItems } from './ListItemsManufacturer';
import Orders from './NewProd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Input from '@material-ui/core/Input';
import Users from './userInfo';
import Transactions from './Transactions';
import PasswordForm from './passwordForm';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {
 
  Switch,
 // Link,
  Redirect
} from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  //const Categories = ['My Products', 'Change Password']
  const classes = useStyles();
  const baseURL = 'https://agile-badlands-70924.herokuapp.com/api/v1/users/'
  const [open, setOpen] = React.useState(true);
  const [values, setValues] = React.useState({
    log_success: false,
    pass_info: false,
    acc_info:false,
    isDelete :false,
    viewHist:false,
    tokenising: ''
  });
  //const [search, setSearch] = React.useState('');



  const handleDelete = event => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    setValues({tokenising:token})
    const id = localStorage.getItem('user_id')
    axios.delete(baseURL + id,
      {headers: {
              'Authorization': token
      }})
    .then(response => {
      console.log(response)
      localStorage.clear();
      setValues({isDelete:true});

    }).catch(error => {
      console.log(error)
    })
    //setOpen(true);

  };

  const handleLogOut = event =>{
    event.preventDefault();
    localStorage.clear();
    setValues({log_success:false});
    window.location.href ="/"
  };

  const handleDashboard = () => {
    setValues({log_success:true})
    //setOpen(true);
  };
   React.useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setValues({info_list: response.data.data});
      })      
  }, []);

  const params = {
    id: values.id,
    //localStorage.getItem('id'),
    name: values.name,
    email: values.email,
    user_type: values.user_type
  }
const u_id = localStorage.getItem('user_id')
  const handlePasswordChange = () => {
    setValues({pass_info:true})
  };
  const handleTH = () => {
    setValues({viewHist:!values.viewHist})
  };
  const handleAccountinfo = () => {
    setValues({acc_info:true})
  };
  const handleAddProducts = event => {
    const timer = setTimeout(() => setValues({log_success:true}), 4000);
    return () => clearTimeout(timer);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
return(
	   <div className={classes.root}>
                {
            values.isDelete ? <Redirect to='/' /> : null
          }


      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Grocery Inventory Management System GIMS
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogOut}>Logout</Button> 
        </Toolbar>
      </AppBar>
     
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>  <div>
        
    
    <ListItem button onClick={handleDashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
        <ListItem button onClick={handleTH}>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Transaction History" />
    </ListItem>
    <ListItem button onClick={handleAccountinfo}>
      <ListItemIcon>
        < AccountBoxIcon/>
      </ListItemIcon>
      <ListItemText primary="View Account Info" />
    </ListItem>

    <ListItem button  onClick={handlePasswordChange}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Change Password" />
    </ListItem>
    <ListItem button onClick={handleDelete}>
      <ListItemIcon>
        <span class="material-icons">delete</span>
      </ListItemIcon>
      <ListItemText primary="Delete Account" />
    </ListItem>

  </div></List>
        <Divider />
        <List>  <div>
  </div></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          {
            values.log_success ? <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid> : null
          }
          {
            values.acc_info ? <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Users />
              </Paper>
            </Grid> : null
          }
          {
            values.viewHist ? <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Transactions />
              </Paper>
            </Grid> : null
          }
          {
            values.pass_info ? <Grid item xs={12}>
              <Paper className={classes.paper}>
                <PasswordForm/>
              </Paper>
            </Grid> : null
          }
          </Grid>
        </Container>
      </main>
    </div>
	);
}
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import { goToPage } from '../utils';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
  }

  goToRegister(e) {
    e.preventDefault();
    this.props.history.push('/register');
  }

  handleEmailChange(e, value) {
    console.log(e.target.value);
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e, value) {
    console.log(e.target.value);
    this.setState({password: e.target.value});
  }

  login(e, context) {
    console.log('event', e, context.state);
    return fetch('http://localhost:8000/users/login', { 
      method: 'post',
      headers: new Headers({
       'Content-Type': 'application/json'
      }),
      body: JSON.stringify( {
              "email": context.state.email,
              "password": context.state.password
          })
     })
     .then(function(res) {
        if (res.ok) {
          goToPage(context.props, '/ticketfeed');
        }
     });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <img src="logo.svg" width="300" height="50"/>
          <Typography variant="headline">Login</Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input onChange={this.handleEmailChange} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={this.handlePasswordChange}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={(e) => this.login(e, this)}
            >
              Login
            </Button>
            <Button onClick={this.goToRegister}>
            or register
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
    );
  }
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignIn));
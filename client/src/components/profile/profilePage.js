import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../header/header';
import Papersheet from './paper';
import Avatar from './avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  container: {
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    margin: '0.2em'
  },
  dense: {
    marginTop: 16,
  },
  profileName: {
    textAlign: 'center',
    fontSize: 40,

  },
  menu: {
    width: 200,
  },
  box: {
    backgroundColor: '#FDFCEE'
  }
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            age: '',
            phone: '',
            email: '',
            bio: ''
        };
    }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

   componentDidMount(){
       this.getProfile();
  }

    getProfile() {
        console.log('...',localStorage.getItem('authToken'));
        fetch('/users/currentUser', {
            method: 'get',
            headers: new Headers({
                'Authorization': localStorage.getItem('authToken')
            })
        })
            .then(res => res.json())
            .then(profile => this.setState(profile))
    }

  render() {
    const { classes } = this.props;
    return (

      <div>
        <div className={classes.box}>
          <Header />
          <Avatar />
          <div className={classes.profileName} component="p">
              {this.state.firstName+" "+this.state.lastName}
          </div>
          <Grid container className={classes.root}>
            <Grid item xs={6}>
              <Papersheet text1={"Reputation"} text2={"0"} />
            </Grid>
            <Grid item xs={6}>
              <Papersheet text1={"10.10.2018"} text2={"Joined"} />
            </Grid>
          </Grid>
        </div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="name"
            className={classes.textField}
            value={this.state.firstName}
            onChange={this.handleChange('name')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Age"
            className={classes.textField}
            value={this.state.age}
            onChange={this.handleChange('age')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Phone"
            className={classes.textField}
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Bio"
            multiline
            value={this.state.bio}
            onChange={this.handleChange('bio')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    );



  }
}
export default withStyles(styles)(Profile);

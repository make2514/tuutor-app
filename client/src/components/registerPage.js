import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from './header/header';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { goToPage } from '../utils';

const styles = theme => ({
    container: {
        marginTop: 70,
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
    grid: {
        alignContent: 'center',
    },
    button: {
        marginTop:16,
        maxWidth:100,
        margin: 'auto'
        
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


class Register extends React.Component {
    state = {
        email: '',
        password: '',
        passwordRepetition: ''
    };
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    register(context) {
        const { email, password, passwordRepetition } = context.state;

        if (password !== passwordRepetition) {
            console.log('check your password');
            return;
        }
        return fetch('http://localhost:8000/users/signup', { 
          method: 'post',
          headers: new Headers({
           'Content-Type': 'application/json'
          }),
          body: JSON.stringify( {
                  email,
                  password
              })
         })
         .then(function(res) {
            if (res.ok) {
                goToPage(context.props, '/createprofile')
            }
         });
      }

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Header />
                <form className={classes.container} noValidate autoComplete="off">
                    {/* <TextField
                        id="outlined-name"
                        label="First Name"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Last Name"
                        className={classes.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="none"
                        variant="outlined"
                    /> */}
                    <TextField
                        required
                        id="outlined-name"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        className={classes.textField}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Confirm Password"
                        value={this.state.passwordRepetition}
                        onChange={this.handleChange('passwordRepetition')}
                        className={classes.textField}
                        margin="none"
                        variant="outlined"
                    />
                    {/* <TextField
                        id="outlined-phone"
                        label="phone"
                        className={classes.textField}
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        margin="none"
                        variant="outlined"
                    /> */}
                     <Button onClick={() => this.register(this)} variant="contained" color="primary"className={classes.button}>
                        Register
                     </Button>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
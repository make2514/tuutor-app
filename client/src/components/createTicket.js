import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Header from './header/header';
import Button from '@material-ui/core/Button';
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
    button: {
        marginTop: 16,
        maxWidth: 100,
        margin: 'auto'

    },
    dense: {
        marginTop: 16,
    },

});

class TicketMaster extends Component {
    state = {
        subject: '',
        info: '',
        payment: '',
        tutor: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createTicket(context) {
        const {
            subject,
            info,
            payment,
            tutor,
        } = context.state;

        return fetch('/notification', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem("authToken")
            }),
            body: JSON.stringify( {
                subject,
                info,
                payment,
                tutor,
            })
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                goToPage(this.props, '/signin');
            }
        })
        .then(ticket => {
            goToPage(this.props, '/viewTicket?ticket=', ticket._id);
        })
         .catch(err => {
            console.log('err', err);
         });
    }

    render() {
        const { classes } = this.props;
        console.log();
        return (
            <div>
                <Header />
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="outlined-required"
                        label="Subject"
                        className={classes.textField}
                        value={this.state.subject}
                        onChange={this.handleChange('subject')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="description..."
                        multiline
                        rows="9"
                        className={classes.textField}
                        value={this.state.info}
                        onChange={this.handleChange('info')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="payment details..."
                        multiline
                        rows="5"
                        className={classes.textField}
                        value={this.state.payment}
                        onChange={this.handleChange('payment')}
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="Tutor"
                            name="tutor"
                            className={classes.group}
                            value={this.state.tutor}
                            onChange={this.handleChange('tutor')}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Tutor" />
                            <FormControlLabel value="false" control={<Radio />} label="Student" />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={() => this.createTicket(this)} variant="contained" color="primary" className={classes.button}>
                        Create
                    </Button>
                </form>
            </div>
        );
    }
}
TicketMaster.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TicketMaster);
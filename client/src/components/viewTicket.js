import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from './header/header';
import Button from '@material-ui/core/Button';
import Contract from './contractButtons';
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
    contract:{
        marginTop: 16,
        maxWidth: 100,
        margin: 'auto',
        display:'block',
    }

});

class ViewTicketMaster extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            subject: '',
            description: '',
            payment: '',
            status: ''
        };
    }

    componentDidMount() {
        this.getTicketInfo();
    }

    getTicketInfo() {
        console.log('...',localStorage.getItem('authToken'));
        let urlParams = new URLSearchParams(window.location.search);
        let ticketId = urlParams.get('ticket');
        fetch('/notification/' + ticketId, { 
          method: 'get',
          headers: new Headers({
           'Authorization': localStorage.getItem('authToken')
          })
         })
         .then(res => {
             console.log('...', res);
            if (res.ok) {
                return res.json();
            } else {
                // TODO: redirect to sign in page
                goToPage(this.props, '/signin');
            }
         })
         .then(ticketInfo => {
             console.log(ticketInfo);
             const { subject, info, payment } = ticketInfo;
             this.setState({
                 subject,
                 description: info,
                 payment
             })
         })
         .catch(err => {
            console.log('err', err);
         })
      }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Header />

                <form className={classes.container} noValidate autoComplete="off">
                    <div className={classes.createdBy} component="p">
                        Created By: Rick Harrison
                    </div>
                    
                    <TextField
                        required
                        id="outlined-required"
                        label="Subject"
                        className={classes.textField}
                        margin="none"
                        variant="outlined"
                        value={this.state.subject}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="description..."
                        multiline
                        rows="9"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.description}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="payment details..."
                        multiline
                        rows="5"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.payment}
                    />
                    {this.state.isHidden &&
                    <Button onClick={this.toggleHidden.bind(this)} variant="contained" color="primary" className={classes.button}>
                        Apply
                    </Button>}
                    {!this.state.isHidden && <Contract />}

                </form>
            </div>
        );
    }
}
ViewTicketMaster.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTicketMaster);
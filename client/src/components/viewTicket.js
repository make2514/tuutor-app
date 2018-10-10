import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from './header/header';
import Button from '@material-ui/core/Button';
import Contract from './contractButtons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
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
        marginRight: 10,
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
    },
    pendingButton: {
        marginRight: 10,
        display:'inline-block',
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
            status: '',
            contract: {
                isUserTicketOwner: undefined,
                contract: {
                }
            }
        };
    }

    componentDidMount() {
        // getCurrentTicket contract
        // If their is now contract, create one when user clicks on chat or clicks "apply"
        this.getProfile();
        this.getTicketInfo();
    }

    getProfile() {
        fetch('/users/currentUser', {
            method: 'get',
            headers: new Headers({
                'Authorization': localStorage.getItem('authToken')
            })
        })
        .then(res => res.json())
        .then(profile => this.setState({profile}))
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

         fetch('/contract/mycontract/' + ticketId, { 
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
                  console.log(res);
                  return {
                    isUserTicketOwner: undefined,
                    contract: {}
                  }
              }
           })
           .then(contract => {
               console.log('mycontract', contract);
               this.setState({contract});
           })
           .catch(err => {
              console.log('err', err);
           })
      }

    createContract () {
        let urlParams = new URLSearchParams(window.location.search);
        let ticketId = urlParams.get('ticket');
        // console.log('create contract', JSON.stringify( {
        //     created: new Date().getTime(),
        //     terms: "default",
        //     payment: "default",
        //     ticket: ticketId,
        //     applicant: this.state.profile._id
        // }));
        return fetch('/contract/', { 
            method: 'post',
            headers: new Headers({
             'Authorization': localStorage.getItem('authToken'),
             'Content-Type': 'application/json'
            }),
            body:  JSON.stringify({
                created: new Date().getTime(),
                terms: "default",
                payment: "default",
                ticket: ticketId,
                applicant: this.state.profile._id
            })
        })
        .then(res => {
            console.log('...', res);
            if (res.ok) {
                return res.json();
            }
        })
    }

    handleApplyTicket () {
        // TODO: add a check to make sure that after click apply, and subsequent clicking on chat
        // does not create a new contract
        // console.log(new Date().getTime());
        this.setState({
            isHidden: !this.state.isHidden
        })
        // this.createContract();
    }

    handleChat() {
        // goto '/chat/:chatId'
        /*
        1. Get chat (contractId)
        - 
        */
        // goToPage(this.props, '/signin');
        console.log(this.state.contract);
        const { contract } = this.state;
        if (contract.isUserTicketOwner !== undefined) {
            console.log(contract.contract._id);
            goToPage(this.props, '/chat/' + contract.contract._id);
        } else {
            this.createContract()
            .then(contract => {
                goToPage(this.props, '/chat/' + contract.contract._id);
            });
        }
    }

    render() {
        const { classes } = this.props;
        // TODO: fill the student list with real data
        const studentList = [{name: 'Tom'}, {name: 'Alicia'}, {name: 'Markus'}].map((student, index) => (
            <ListItem key={index}>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText primary={student.name} secondary={
                    <Button onClick={this.handleChat.bind(this)} variant="contained" color="primary" className={classes.button}>
                        Chat
                    </Button>
                } />
            </ListItem>
        ));
        return (
            <div>
                <Header />

                <form className={classes.container} noValidate autoComplete="off">
                    <div className={classes.createdBy} component="p">
                        {/* TODO: Add logic here to get user info */}
                        {this.state.contract.isUserTicketOwner === undefined ? null :
                        this.state.contract.isUserTicketOwner === true ? null :
                        null }
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
                    <div>
                        {
                            !this.state.contract.isUserTicketOwner ?
                            <div>
                                <Button onClick={this.handleApplyTicket.bind(this)} variant="contained" color="primary" className={classes.button}>
                                    Apply
                                </Button>
                                <Button onClick={this.handleChat.bind(this)} variant="contained" color="primary" className={classes.button}>
                                    Chat
                                </Button>
                            </div>: null
                        }
                        {
                            this.state.contract.isUserTicketOwner === true ?
                            <List>
                                Student List
                                {studentList}
                            </List> : null
                        }
                    </div>}
                    {!this.state.isHidden && 
                        <div>
                            <Button variant="raised" color="primary" className={classes.button}>
                                Pending
                            </Button>
                            <Button onClick={this.handleChat.bind(this)} variant="contained" color="primary" className={classes.button}>
                                Chat
                            </Button>
                    </div>}
                </form>
            </div>
        );
    }
}
ViewTicketMaster.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTicketMaster);
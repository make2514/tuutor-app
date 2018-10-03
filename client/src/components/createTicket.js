import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="outlined-required"
                        label="Subject"
                        defaultValue=""
                        className={classes.textField}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="description..."
                        multiline
                        rows="9"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="payment details..."
                        multiline
                        rows="5"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button onClick={() => goToPage(this.props, '/viewticket')} variant="contained" color="primary" className={classes.button}>
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
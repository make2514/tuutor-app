import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from './header/header';
import Button from '@material-ui/core/Button';
import { goToPage } from '../utils';
import { red, green } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const redTheme = createMuiTheme({ palette: { primary: red } })

const greenTheme = createMuiTheme({ palette: { primary: green } })

const styles = theme => ({

    container: {
        marginTop: 70,
        display: 'flex',
        flexWrap: 'wrap',
        // flexDirection: 'column',
        // maxWidth: '300px',
        // margin: 'auto'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: '0.2em'
    },
    button: {
        marginTop: 16,
        maxWidth: 100,
        marginLeft: 5,
    },
    dense: {
        marginTop: 16,
    },

});


class ViewTicketMaster extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <MuiThemeProvider theme={greenTheme}>
                    <Button variant="raised" color="primary" className={classes.button}>
                        Accept
                </Button>
                </MuiThemeProvider>
                <MuiThemeProvider theme={redTheme}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Deny
                </Button>
                </MuiThemeProvider>
            </div>
        );
    }
}
ViewTicketMaster.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTicketMaster);
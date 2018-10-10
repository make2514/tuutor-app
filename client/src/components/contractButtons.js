import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red, green } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const redTheme = createMuiTheme({ palette: { primary: red } })

const greenTheme = createMuiTheme({ palette: { primary: green } })

const styles = theme => ({

    container: {
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: '0.2em'
    },
    button: {
        marginTop: 16,
        maxWidth: 100,
        marginLeft:5

    },
    dense: {
        marginTop: 16,
    },
    themediv: {
        marginTop: 16,
        maxWidth: 100,
        margin: 'auto'
    },

});

class ContractButtons extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <MuiThemeProvider theme={greenTheme}>
                    <Button variant="raised" color="primary" className={classes.button}>
                        Pending
                    </Button>
                </MuiThemeProvider>
            </div>
        );
    }
}
ContractButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContractButtons);
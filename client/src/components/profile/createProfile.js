import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from '../header/header';
import Button from '@material-ui/core/Button';

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

class CreateProfile extends Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        phone:'',
        age: '',
        multiline: '-',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Header />
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Age"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Gender"
                        className={classes.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-name"
                        label="email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-phone"
                        label="phone"
                        className={classes.textField}
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        margin="none"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Bio"
                        multiline
                        value={this.state.multiline}
                        onChange={this.handleChange('multiline')}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                     <Button variant="contained" color="primary"className={classes.button}>
                     Save
                     </Button>
                </form>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateProfile);
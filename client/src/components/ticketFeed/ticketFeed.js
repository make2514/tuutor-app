import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Header from '../header/header';
import { goToPage } from '../../utils';


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        top: '56px'
    },
    selected: {
        color: 'green',
        background: 'red',
    },
    tabHeader:{
        backgroundColor:"#5569D7",
    },
});

class TicketFeed extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0,
        ticketFeed: []
    };

    componentDidMount() {
        this.getTicketFeed();
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    getTicketFeed() {
        console.log('...',localStorage.getItem('authToken'));
        fetch('/notification', { 
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
         .then(ticketFeed => {
            return this.setState({ticketFeed});
         })
         .catch(err => {
            console.log('err', err);
         })
      }

    renderTutorClasses(props) {
        console.log(this.state.ticketFeed, '...');
        const tutorClassesData = this.state.ticketFeed.filter(ticket => {
            return ticket.tutor === true;
        });
        const tutorClasses = tutorClassesData.map((value, index) => (
                <ListItem onClick={() => goToPage(props, '/viewticket?ticket=', value._id)} key={index}>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    <ListItemText primary={value.subject} secondary={value.info} />
                </ListItem>
            ));
        return (
            <TabContainer>
                <List>
                    {tutorClasses}
                </List>
            </TabContainer>
        );
    }

    renderStudentRequests(props) {
        const tutorClassesData = this.state.ticketFeed.filter(ticket => {
            return ticket.tutor === false;
        });
        const tutorClasses = tutorClassesData.map((value, index) => (
                <ListItem onClick={() => goToPage(props, '/viewticket')} key={index}>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    <ListItemText primary={value.subject} secondary={value.info} />
                </ListItem>
            ));
        return (
            <TabContainer>
                <List>
                    {tutorClasses}
                </List>
            </TabContainer>
        );
    }
    
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        console.log(this.state);
        return(
            <div>
                <Header />
                <div className={classes.root}>
                    <AppBar position="static" className={classes.tabHeader}>
                    <Tabs centered value={value} onChange={this.handleChange}>
                    <Tab label="Tutor classes" />
                    <Tab label="Student requests" />
                    </Tabs>
                    </AppBar>
                        {value === 0 &&
                            this.renderTutorClasses(this.props)}
                        {value === 1 &&
                            this.renderStudentRequests(this.props)}
                    </div>
            </div>
        )
    }
}

TicketFeed.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TicketFeed);
import React, {Component} from 'react';
import {subscribeToChat, sendMessage, receiveMessage} from "../../chat";
import Header from "../header/header";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PlayArrow from '@material-ui/icons/PlayArrow';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    chatFeed: {
        marginTop: '56px',
        marginBottom: '36px'
    },
    message: {
        margin: '4px',
        padding: '4px 8px 4px 8px'
    },
    msgName: {
        color: '#3F51B5'
    },
    input: {
        background: '#efefef',
        zIndex: 1,
        position: 'fixed',
        bottom: 0
    }

});

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatLog: [],
            input: '',
            users: null,
        };
    }

    componentDidMount() {
        subscribeToChat(this.props.chatId,(err, history) => {
            this.setState({
                chatLog: history.messages
            });
            this.scrollToBottom();
        });

        receiveMessage((err, message) => {
            this.state.chatLog.push(message);
            this.setState({ chatLog: this.state.chatLog});
            this.scrollToBottom();
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.chatFeed}>
                <Header className={classes.header}/>
                {this.renderChatMessages()}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <Input
                    id="input"
                    name={'input'}
                    className={classes.input}
                    value={this.state.input}
                    onChange={this.handleChange}
                    onKeyPress={(e) => { this.handleKeyPress(e, this) }}
                    fullWidth={true}
                    multiline={true}
                    rowsMax={2}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={(e) => {this.handleSubmit(e, this) }}
                            >
                                <PlayArrow />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>
        );
    }

    renderChatMessages() {
        const { classes } = this.props;

        if (this.state.chatLog.length > 0) {
            return(
                <div>
                    {this.state.chatLog.map((msg) => (
                        <Paper key={msg._id} className={classes.message} elevation={1}>
                            <Typography className={classes.msgName} component="p">
                                {msg.fullName}
                            </Typography>
                            <Typography component="p">
                                {msg.content}
                            </Typography>
                        </Paper>
                    ))}
                </div>
            )
        } else {
            return(
                <div>No messages yet</div>
            )
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };

    handleSubmit = (e, context) => {
        if (context.state.input === '' || context.state.input === null) return;
        sendMessage(context.state.input);
        context.setState({
            value: '',
            input: ''
        });
    };

    handleKeyPress = (e, context) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSubmit(e, context);
        }
    };

    scrollToBottom = () => {
        if (this.messagesEnd) this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

}

export default withStyles(styles)(Chat);
import React, {Component} from 'react';
import {subscribeToChat, sendMessage, receiveMessage} from "../../chat";
import Header from "../header/header";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PlayArrow from '@material-ui/icons/PlayArrow';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
    chat: {
    },
    header: {

    },
    messages: {
        marginBottom: '36px',
        marginLeft: '8px',
        marginRight: '8px'
    },
    input: {
        zIndex: 1,
        background: '#fff',
        position: 'fixed',
        bottom: 0
    }

});

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatLog: null,
            input: null
        };

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
            <div className={classes.chat}>
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
                    variant="filled"
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

        if (this.state.chatLog) {
            return(
                <div className={classes.messages}>
                    {this.state.chatLog.map((msg) => (
                        <TextField
                            key={msg._id}
                            id={msg.userId}
                            label={msg.userId}
                            value={msg.content}
                            fullWidth={true}
                            margin="dense"
                            variant="outlined"
                        />
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
            this.handleSubmit(e, context);
        }
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

}

export default withStyles(styles)(Chat);
import React, {Component} from 'react';
import {subscribeToChat, sendMessage, recieveMessage} from "../../chat";

class Chat extends Component {
    constructor(props) {
        super(props);
        subscribeToChat(this.props.chatId,(err, history) => this.setState({
            chatLog: history.messages
        }));
        recieveMessage((err, message) => {
            this.state.chatLog.push(message);
            this.setState({ chatLog: this.state.chatLog});
        });
    }
    state = {
        chatLog: null,
        input: null
    };

    render() {
        return (
            <div className="Chat">
                <div className="App-intro">
                    {this.renderChatMessages()}
                </div>
                <form
                    style={{position: 'absolute', bottom: 50, left: 50}}
                    onSubmit={this.handleSubmit}
                >
                    <input type={'text'}
                           ref={(ref) => this.input = ref}
                           name={'input'}
                           onChange={this.handleChange}
                    />
                    <input type={'submit'} value={'Send'}/>
                </form>
            </div>
        );
    }

    renderChatMessages() {
        if (this.state.chatLog) {
            return(
                <ul>
                    {this.state.chatLog.map((msg) => (
                        <li key={msg._id}>time: {msg.time} userId: {msg.userId} message: {msg.content}</li>
                    ))}
                </ul>
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

    handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(this.state.input);
        this.setState({ value: '' });
        this.input.value = '';
    }
}

export default Chat;
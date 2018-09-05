import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <Username currentUser={this.props.currentUser.name} switchCurrentUser={this.props.switchCurrentUser} />
        <Message handleNewMessage={this.props.handleNewMessage} />
      </footer>
    );
  }
}

class Username extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  updateCurrentUser = (e) => {
    const usernameInput = e.target.value;
    this.props.switchCurrentUser(usernameInput);
  }

  render() {
    return (
      <input name="user" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} value={this.state.currentUser} onChange={this.updateCurrentUser}/>
    );
  }
}

class Message extends Component {
  constructor(props) {
    super(props);
  }
  
  submitMessage = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.newMessage.value;
    this.props.handleNewMessage(userInput)
    e.target.elements.newMessage.value = '';
  }
  
  render() {
    return (
      <form onSubmit={this.submitMessage}>
        <input name="newMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" type="text"/>
      </form>
    );
  }
}

export default ChatBar;
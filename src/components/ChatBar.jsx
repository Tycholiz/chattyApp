import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <Username currentUser={this.props.currentUser.name} />
        <Message addNewMessage={this.props.addNewMessage} />
      </footer>
    );
  }
}

class Username extends Component {
  render() {
    return (
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}/>
    );
  }
}

class Message extends Component {
  constructor(props) {
    super(props);
  }
  submitMessage = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.newMessage.value
    this.props.addNewMessage(userInput)
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
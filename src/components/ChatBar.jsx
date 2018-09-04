import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <Username currentUser={this.props.currentUser} />
        <Message />
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
  render() {
    return (
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    );
  }
}



export default ChatBar;
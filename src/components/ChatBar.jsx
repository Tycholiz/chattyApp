import React, { Component } from 'react';

class Username extends Component {
  render() {
    return (
      <input className="chatbar-username" placeholder="Your Name (Optional)"/>
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

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <Username />
        <Message />
      </footer>
    );
  }
}


export default ChatBar;
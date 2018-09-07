import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    
    const messages = this.props.messages.map((message, index) => {
      // console.log(message.username)
      if (message.type === "incomingMessage") {
        return <Message username={message.username} content={message.content} userName={this.props.userName} userColor={this.props.userColor} key={message.id} />
      } else if (message.type === "incomingNotification") {
        return (
        <div className="message system" key={index}>
          {message.content}
        </div>
        )
      }
    }
    );
   
    return (
      <main className="messages">
        {messages}
      </main>  
    );
  }
}

export default MessageList;
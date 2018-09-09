import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    
    const messages = this.props.messages.map((message, index) => {
      if (message.type === "incomingMessage") {
        return <Message message={message} key={message.id} />
      } else if (message.type === "incomingNotification") {
        return <Notification message={message} key={message.id} />
        // <div className="message system" key={index}>
        //   {message.content}
        // </div>
        
      } else {
        console.log(message.type)
        console.error("types other than message and notification not supported")
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
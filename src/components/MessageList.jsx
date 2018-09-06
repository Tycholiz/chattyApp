import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log(this.props)

    const messages = this.props.messages.map((message) => {
      if (message.type === "incomingMessage") {
        return <Message username={message.username} content={message.content} key={message.id} />
      } else {
        return (
        <div className="message system">
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
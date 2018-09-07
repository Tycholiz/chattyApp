import React, { Component } from 'react';


class Message extends Component {
  render() {
    const spanStyle = {
      color: this.props.message.color
    };
    console.log(this.props.message)
    return (
      <div className="message">
        <span className="message-username" style={spanStyle} >{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>  
    )
  }
}

export default Message;
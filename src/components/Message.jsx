import React, { Component } from 'react';
const functionsModule = require('./functions.js')
const hasImgExtension = functionsModule.hasImgExtension

class Message extends Component {
  render() {
    const spanStyle = {
      color: this.props.message.color
    };

    let content = "";
    if (hasImgExtension(this.props.message.content)) {
      content = <img className="message-content" src={this.props.message.content}></img>
    } else {
      content = <span className="message-content">{this.props.message.content}</span>
    }

    return (
      <div className="message">
        <span className="message-username" style={spanStyle} >{this.props.message.username}</span>
        {content}
      </div>  
    )
  }
}

export default Message;
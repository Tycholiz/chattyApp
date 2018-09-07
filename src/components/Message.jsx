import React, { Component } from 'react';


class Message extends Component {
  render() {
    const spanStyle = {
      color: this.props.message.color
    };

    function hasImgExtension(imgLink) {
      const extension = imgLink.slice(imgLink.length - 4) ;
      if (extension === '.jpg' || extension === ".png" || extension === ".gif" || extension === "jpeg") {
        return true;
      }
      return false;
    }

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
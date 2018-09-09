import React, { Component } from 'react';


class Notification extends Component {
  render() {
    console.log(this.props.message.content)
    return(
      <div className="message system" key={this.props.index}>
        {this.props.message.content}
      </div>
    )
  }
}







export default Notification;
import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
const socket = new WebSocket(`ws://localhost:3001`)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Kyle'
      },
      messages: []
    };
  }
  handleNewMessage = (content) => {
    const prevState = this.state;
    const newMessage = {
      type: "postMessage",
      username: prevState.currentUser.name,
      content: content
    }
    socket.send(JSON.stringify(newMessage));
  }

  switchCurrentUser = (newCurrentUser) => {
    const currentUser = this.state.currentUser.name;
    const notificationObject = {
      type: "postNotification", 
      content: `${currentUser} has changed their name to ${newCurrentUser}.`
    }
    const newMessages = this.state.messages;
    socket.send(JSON.stringify(notificationObject));   //DOES THIS UPDATE STATE? DO I NEED LINE 39?
  
    this.setState({
      currentUser: {
        name: newCurrentUser
      },
      // messages: newMessages.concat(notificationObject)
    })

  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    socket.onmessage = (event) => {
      const messages = this.state.messages
      const newData = JSON.parse(event.data)
      const newMessages = messages.concat(newData);
      switch(newData.type) {
        case "incomingMessage":

          break;
        case "incomingNotification":

          break;
        default:
          throw new Error("Unknown event type " + newData.type);
      }
      this.setState({messages: newMessages})
    }

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {username: "Michelle", content: "Hello there!", id: "e7257000-b15f-11e8-9a01-5945386ce9ee"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <main>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} 
        handleNewMessage={this.handleNewMessage} 
        switchCurrentUser={this.switchCurrentUser}/>
      </main>
    );
  }
}

function NavBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}

export default App;

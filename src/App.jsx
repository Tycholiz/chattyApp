import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
const socket = new WebSocket(`ws://localhost:3001`)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Bob'
      },
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        }
      ]
    }
  }
  handleNewMessage = (content) => {
    const prevState = this.state;
    const newMessage = {
      id: prevState.messages[prevState.messages.length - 1].id + 1,
      username: prevState.currentUser.name,
      content: content
    }
    this.setState((prevState) => {
      return {
        messages: prevState.messages.concat(newMessage)
      }
    });
    socket.send(JSON.stringify(newMessage));
    
  }
  switchCurrentUser = (newCurrentUser) => {
    this.setState({currentUser: {name: newCurrentUser}})
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
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

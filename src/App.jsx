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
      // id: prevState.messages[prevState.messages.length - 1].id + 1,
      username: prevState.currentUser.name,
      content: content
    }
    // this.setState((prevState) => {
    //   return {
    //     messages: prevState.messages.concat(newMessage)
    //   }
    // });
    socket.send(JSON.stringify(newMessage));
    
  }
  switchCurrentUser = (newCurrentUser) => {
    this.setState({currentUser: {name: newCurrentUser}})
  }

  componentDidMount() {
    socket.onmessage = (event) => {
      const messages = this.state.messages
      const newMessage = JSON.parse(event.data)
      const newMessages = messages.concat(newMessage);
      this.setState({messages: newMessages})
      console.log("hello", this.state.messages)
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

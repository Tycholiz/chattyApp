import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
const socket = new WebSocket(`ws://localhost:3001`)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Kyle',
        color: 'grey'
      },
      messages: [],
      userCount: 0
    };
  }
  handleNewMessage = (content) => {
    const currentState = this.state;
    const newMessage = {
      type: "postMessage",
      username: currentState.currentUser.name,
      content: content,
      color: currentState.currentUser.color
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
    socket.send(JSON.stringify(notificationObject));   //DOES THIS UPDATE STATE? DO I NEED LINE 43?
  
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        name: newCurrentUser
      },
      // messages: newMessages.concat(notificationObject)
    }));

  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    socket.onmessage = (event) => { //this is where the data incoming from the server gets routed toward where it needs to go depending on what its "type" property is
      const messages = this.state.messages
      const newData = JSON.parse(event.data)
      if (newData.type === "userCount") {
        this.setState({userCount: newData.userCount })
      } else if (newData.type === "incomingMessage" 
        || newData.type === "incomingNotification") {
        const newMessages = messages.concat(newData);
        this.setState({messages: newMessages})
      } else if (newData.type === "userColor") {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            color: newData.userColor            
          }
        }));
      } else {
        console.error("data type coming from server does not exist");
      }
    }
    setTimeout(() => {
      const newMessage = {username: "Michelle", content: "Hello there!", id: "e7257000-b15f-11e8-9a01-5945386ce9ee"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("#####", this.state)
    return (
      <main>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} userColor={this.state.currentUser.color} userName={this.state.currentUser.name} />
        <ChatBar currentUser={this.state.currentUser} 
        handleNewMessage={this.handleNewMessage} 
        switchCurrentUser={this.switchCurrentUser}/>
      </main>
    );
  }
}


class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="users-online">{`${this.props.userCount} user(s) connected`}</span>
      </nav>
    )
  }
}

export default App;

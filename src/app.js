import React, { Component } from 'react';
import { View, Text } from 'react-native';

// user authentification
import firebase from 'firebase';

// components
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAo4Gj9QqCUmzgX70lPg8uQKH5IUI46O9I",
      authDomain: "auth-8d3b1.firebaseapp.com",
      databaseURL: "https://auth-8d3b1.firebaseio.com",
      projectId: "auth-8d3b1",
      storageBucket: "auth-8d3b1.appspot.com",
      messagingSenderId: "584831296362"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );

      case false:
        return <LoginForm />;

      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}

export default App;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components';
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import Navbar from './NavBar';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'test',
      email: 'test',
      fName: 'test',
      lName: 'test',
    };
  }

  // componentDidMount() {
  //   this.fetchUser();
  // }

  // fetchUser() {
  //   axios.get(`/api/teachers/${localStorage.getItem('id_token')}`)
  //   .then((data) => {
  //     this.setState({ username: data.data.username, email: data.data.email, fName: data.data.fName, lName: data.data.lName });
  //   })
  //   .catch((err) => {
  //     if (err){
  //       console.log('there was an error fetching user', err);
  //     }
  //   })
  // }
// render() {
//     return (
      /*<div>
        <PageHeader>Your Profile <small>Account information</small></PageHeader>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        <div>{this.state.fName}</div>
        <div>{this.state.lName}</div>
        <Link to="/editprofile">Edit Profile</Link>
      </div>
                  
                
                <Content />
                <Footer >
                    <FooterTab>
                        <Button onPress={Actions.test}>
                            <Text>Home</Text>
                        </Button>
                        <Button onPress={Actions.profile} >
                            <Text>Profile</Text>
                        </Button>
                        <Button >
                            <Text>Stats!</Text>
                        </Button>
                        <Button>
                            <Text>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
    );
  }*/
  render() {
    return (

        
        <View >
          <Text style={{padding: 40, marginTop: 100}}>Profile</Text>
          <Navbar />
        </View>
        

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center'
  }
})



import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import ActionButton from 'react-native-circular-action-menu';
import { logoutUser } from '../../actions/login';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { logoutUser } = this.props;
    const { container, button } = styles;
    return (
      <View style={{ marginBottom: 10,backgroundColor: '#f3f3f3'}}>
        {/*Rest of App come ABOVE the action button component!*/}
        <ActionButton buttonColor="#da0576">
          <ActionButton.Item buttonColor='#9b59b6' title="Home" onPress={Actions.home}>
            <Icon name="ios-school-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Profile" onPress={Actions.profile}>
            <Icon name="md-person" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Logout" onPress={logoutUser}>
            <Icon name="md-trash" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'black',
    borderRightWidth: 0.6,
    borderColor: 'lightgray',
    borderRadius: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
};

export default connect(null, { logoutUser })(NavBar);



      /*<View>
        <Footer style={container} >
          <FooterTab>
            <Button style={button} onPress={Actions.home}>
              <Icon name="apps" />
            </Button>
            <Button style={button} onPress={Actions.cameraroute}>
              <Icon name="camera" />
            </Button>
            <Button style={button} onPress={logoutUser}>
              <Icon active name="navigate" />
            </Button>
            <Button style={button} onPress={Actions.profile} >
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </View>*/
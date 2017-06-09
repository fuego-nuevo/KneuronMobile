import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import  { connect } from "react-redux";
import Navbar from '../NavBar/NavBar';
import CohortListEntry from './CohortListEntry';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import axios from 'axios';
import Config from 'react-native-config';
const { width, height } = Dimensions.get("window");


let screen = Dimensions.get('window');

class CohortList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      classCode: '',
    };
    this.sendCode = this.sendCode.bind(this);
    this.classCode = this.classCode.bind(this);

  }


  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  classCode(text) {
    console.log('this is the text from ', text);
    this.setState({
      classCode: text,
    });
  }

  sendCode() {
    const body = {
      code: this.state.classCode,
      student_id: this.props.profile.id, 
    };
    axios.post(`${Config.Local_Host}/api/studentCohorts`, body)
    .then((data) => {
      console.log("this is the data returned from posting new class", data);
      this.props.getCorhortList();
      this.setState({ classCode: this.state.classCode });
    })
    .catch(error => console.log('This is the error in sendCode ', error));
  }

  render() {
    // const { container } = styles;
    const BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}>X</Button>;

    console.log('these are props line 15 ', this.props);
    console.log('this is the state of cohorts list ', this.state)
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btn}>

        <Text onPress={() => this.setState({isOpen: true})} style={{textAlign: 'center', color: 'white'}} >Add Class</Text>
        </TouchableOpacity>

        <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal]} position={"center"} backdropContent={BContent}>
          <TextInput
            type="text"
            placeholder="Enter Class Code"
            style={styles.input}
            onChangeText={text => this.classCode(text)}
          />
          <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={() => { this.sendCode(); }}>Submit Clas Code</Text>
        </TouchableOpacity>
        </Modal>
        { !this.state.isOpen &&
        <ScrollView style={styles.container}>
          {this.props.cohorts.map(cohort =>
            (<CohortListEntry key={cohort.id} id={cohort.id} cohort={cohort} />))}
        </ScrollView>
        }
        <View style={{position: 'absolute', bottom: 13, width: '100%'}}>
          <Navbar />
        </View>
      </View>

    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

// const styles = {
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     width: '100%',
//     marginTop: '20%',
//   },

// };

const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 60,
    flex: 1,
    
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: '5%',
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    backgroundColor: '#da0576',
    color: 'white',
    padding: 10,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 20,
    marginTop: 10,
  },

  btnModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },

  text: {
    color: 'black',
    fontSize: 22,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,255,0.3)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },

});


export default connect(mapStateToProps)(CohortList);

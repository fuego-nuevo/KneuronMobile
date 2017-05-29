import React from 'react';
import { View, Text } from 'react-native'

const LectureEntry = (props) => {
  const { container, title, text } = styles;
  console.log(props)
 return (
    <View style={container}>
      <View style={title}>
        <Text style={text}>{props.lecture.name}</Text>
      </View>
      <View>
        <Text>{props.lecture.date}</Text>
      </View>
    </View>
  )
}


const styles = {
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 175,
    width: '90%',
    marginLeft: '5%',
    borderColor: '#ddd',
    borderRadius: 5,
    borderBottomWidth: 0,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .2,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    // flex: 1,
    position: 'absolute',
    backgroundColor: '#a3b2cc',
    padding: 3,
    width: '100%',
    top: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '15%',
  },
}
export default LectureEntry;
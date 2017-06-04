import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import LectureEntry from './LectureEntry';


const LectureList = (props) => {
  const { container } = styles;
  console.log("PROPS INSIDE LECTURELIST ARE: ", props);
  return (
    <ScrollView style={container}>
      {props.lectures.map(lecture => <LectureEntry key={lecture.id} lecture={lecture} />)}
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: '20%',
  },
};

const mapStateToProps = state => ({
  lectures: state.currentCohort.lectures,
});

export default connect(mapStateToProps)(LectureList);

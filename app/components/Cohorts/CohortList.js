import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import CohortListEntry from './CohortListEntry';

class CohortList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { container } = styles;
    console.log('these are props line 15 ', this.props);
    return (
      <ScrollView style={container}>
        {this.props.cohorts.map(cohort =>
          (<CohortListEntry key={cohort.id} id={cohort.id} cohort={cohort}/>))}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: '20%'
  },
};


export default CohortList;

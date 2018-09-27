import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

import FetchLocation from '../../components/FetchLocation/FetchLocation';

class ReportView extends Component {
  state = {
    title: '',
    formValid: true,
    errorMessage: null
  }

  getUserLocationHandler = () => {
    if (this.state.title.trim() === '') {
      console.log("title cannot be empty")
      this.setState({formValid: false})
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);

        const jsonBody = {
          "title": this.state.title,
          "position": {
            coordinates: [position.coords.longitude, position.coords.latitude]
          }
        };
        // console.log('jsonBody', jsonBody);

        fetch('http://localhost:3000/report', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(jsonBody),
        })
        .then(res => res.json())
        .then(resJson => console.log(resJson))
        .catch(err => {
          console.log(err);
          this.setState({
            errorMessage: err
          });
        })

        this.props.navigation.navigate('ListReports')
      }, err => console.log(err));
    }
  }

  recordChangeHandler = text => {
    this.setState({title: text})
  }

  render() {
    const validationMessage = this.state.formValid
      ? null : <Text style={styles.validationMessage}>Please Input a Title</Text>;

    return (
      <View style={styles.reportViewContainer}>
        <Text style={styles.formTitle}>What is your report about?</Text>
        {validationMessage}
        <TextInput
          style={styles.titleInput}
          placeholder="Record Title"
          onChangeText={this.recordChangeHandler}
          />
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <Button title="Return to Reports"
            onPress={() => this.props.navigation.navigate('ListReports')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reportViewContainer: {
    height: '100%',
    padding: 40
  },
  validationMessage: {
    color: 'red'
  },
  formTitle: {
    fontWeight: 'bold'
  },
  titleInput: {
    height: 40,
    backgroundColor: '#e0e0d1',
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 15,
  }
});

export default ReportView;

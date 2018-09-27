import React, {Component} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';

class ListReports extends Component {
  state = {
    "reports": [
      {
        "_id": "5ba89bce43a10d15008c0a99",
        "title": "First report",
        "time": 1537781602327,
        "position": {
          "lat": 37.785834,
          "lng": -122.406417
        }
      },
      {
        "_id": "5ba89bd843a10d15008c0a9a",
        "title": "Second report",
        "time": 1537781602328,
        "position": {
          "lat": 37.785834,
          "lng": -122.406417
        }
      },
      {
        "_id": "5ba8af500e0469150064b98e",
        "title": "Third report",
        "time": 1537781602329,
        "position": {
          "lat": 37.785834,
          "lng": -122.406417
        }
      }
    ]
  }

  APIcall = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <View style={styles.listReportsContainer}>
        <Text>Inside the List Reports View</Text>
        <FlatList data={this.state.reports}
          renderItem={({item}) => {
            return (
              <View>
                <Text style={styles.listItemTitle}>{item.title}</Text>
                <Text style={styles.listItemText}>{item.position.lat}, {item.position.lng}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}/>
          <Button title="API call" onPress={this.APIcall} />
          <Button title="Create your own report!"
            onPress={() => this.props.navigation.navigate('ReportView')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listReportsContainer: {
    height: '100%',
    padding: 40
  },
  listItemTitle: {
    fontWeight: 'bold'
  },
  listItemText: {
    color: 'green'
  }
});

export default ListReports;

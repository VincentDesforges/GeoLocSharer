import React, {Component} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';

class ListReports extends Component {
  state = {
    reports: [],
    loading: false,
    errorMessage: null
  }

  APIcall = () => {
    this.setState({loading: true});
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);
      // In Debug -> Location -> Custom Location -> lat: 50.874646 long: 4.402978
      fetch(`http://localhost:3000/report/${position.coords.latitude}/${position.coords.longitude}`)
        .then(res => res.json())
        .then(resJson => {
          // console.log(typeof resJson, resJson.reports);
          this.setState({
            reports: resJson.reports,
            loading: false,
            errorMessage: null
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            errorMessage: err
          })
        });
      }, err => console.log(err));
  }

  convertTime = (unixTime) => {
    const date = new Date(unixTime);
    const hrs = date.getHours();
    const min = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    return (
      `${hrs}:${min} on the ${dd}/${mm}/${yyyy}`
    );
  }

  componentDidMount() {
    this.APIcall();
  }

  render () {
    const loadingMessage = this.state.loading
      ? <Text style={styles.loadingMessage}>Loading...</Text>: null;

    return (
      <View style={styles.listReportsContainer}>
        <Text style={styles.pageTitle}>List Reports View</Text>
        {loadingMessage}
        <FlatList data={this.state.reports}
          renderItem={({item}) => {
            // console.log(item);
            return (
              <View style={{marginBottom: 25}}>
                <Text style={styles.listItemTitle}>Title: {item.title}</Text>
                <Text>Issued at: {this.convertTime(item.time)}</Text>
                <Text>Distance: {item.dist.calculated.toFixed(0)} m</Text>
                <Text style={styles.listItemText}>Lat: {item.position.coordinates[1]}, Long: {item.position.coordinates[0]}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}/>
          <Button title="Refresh Reports" onPress={this.APIcall} />
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
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 30
  },
  loadingMessage: {
    fontWeight: 'bold',
    color: 'green'
  },
  listItemTitle: {
    fontWeight: 'bold'
  },
  listItemText: {
    color: 'green'
  }
});

export default ListReports;

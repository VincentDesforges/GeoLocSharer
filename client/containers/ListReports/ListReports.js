import React, {Component} from 'react';
import {View, Text, ScrollView, Button, StyleSheet} from 'react-native';

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

  orderByAge = () => {
    console.log('orderByAge');
    const orderedReports = this.state.reports.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    console.log(orderedReports);
    this.setState({reports: orderedReports});
  }

  orderByDistance = () => {
    console.log('orderByDistance');
    const orderedReports = this.state.reports.sort((a, b) => {
      return a.dist.calculated - b.dist.calculated;
    });
    this.setState({reports: orderedReports});
  }

  componentDidMount() {
    this.APIcall();
  }

  render () {
    const loadingMessage = this.state.loading
      ? <Text style={styles.loadingMessage}>Loading...</Text>: null;

    const listOfReports = this.state.reports.map((item) => {
      return (
        <View style={{marginBottom: 25}} key={item._id}>
          <Text style={styles.listItemTitle}>Title: {item.title}</Text>
          <Text>Issued at: {this.convertTime(item.time)}</Text>
          <Text>Distance: {item.dist.calculated.toFixed(0)} m</Text>
          <Text style={styles.listItemText}>Lat: {item.position.coordinates[1]}, Long: {item.position.coordinates[0]}</Text>
        </View>
      );
    });

    return (
      <View style={styles.listReportsContainer}>
        <Text style={styles.pageTitle}>List Reports View</Text>
        <View style={styles.orderRow}>
          <Button title="Order by Age" onPress={this.orderByAge}/>
          <Button title="Order by Distance" onPress={this.orderByDistance}/>
        </View>
        {loadingMessage}
        <ScrollView>
          {listOfReports}
        </ScrollView>

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
  orderRow: {
    display: 'flex',
    'flexDirection': 'row'
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

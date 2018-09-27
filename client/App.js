import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';

import ReportView from './containers/ReportView/ReportView';
import ListReports from './containers/ListReports/ListReports';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createSwitchNavigator({
  ListReports: ListReports,
  ReportView: ReportView
});

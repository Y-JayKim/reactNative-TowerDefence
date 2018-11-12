import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

export default class SignUpScreen extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <Text style={{top:100}}>This page is currently not available. Please just click login</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  text:{
    fontSize:30,
    top:30
  }
});
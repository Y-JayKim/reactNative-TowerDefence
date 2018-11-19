import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

export default class CollectionScreen extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    static navigationOptions = {
        title: 'Collection',
        headerStyle: {
            backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {
        return (
            <View style={styles.container}>
            	<Text style={styles.text}>Collection</Text>
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
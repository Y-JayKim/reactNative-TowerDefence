import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class QuizPromptScreen extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Would you like to prompt the quiz to collect this plane?</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=>this.props.navigation.navigate('Quiz')}
                >
                    <Text>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                >
                    <Text>No</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:200,
    height:70,
    borderWidth:0.5, 
    borderColor:'black',
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
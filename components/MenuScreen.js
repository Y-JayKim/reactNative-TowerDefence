import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class MenuScreen extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    static navigationOptions = {title: 'Menu'};
  
    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('theUser', 'guest');

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Menu</Text>
                <TouchableHighlight
                     style={[styles.button, {top:100}]}
                     onPress={()=>{this.props.navigation.navigate('Map');}}>
                     <Text>Find an Airplane</Text>
                </TouchableHighlight>
                
                {user != 'guest' && <TouchableHighlight
                     style={[styles.button, {top:150}]}
                     onPress={()=>{this.props.navigation.navigate('Collection');}}>
                     <Text>Collection</Text>
                </TouchableHighlight>}
                
                <TouchableHighlight
                     style={[styles.button, {top:200}]}
                     onPress={()=>console.log('button clicked')}>
                     <Text>IDONKNOW</Text>
                </TouchableHighlight>
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, StyleSheet, TouchableHighlight } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import { bcrypt } from 'react-native-bcrypt';

export default class MenuScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          collections: null,
          showAlert: true,
          title: 'Hi!',
          message: 'Welcome, Guest!'
        }
    }

    static navigationOptions = {
      title: 'Menu',
      headerStyle: {
          backgroundColor: '#625E5E'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold'
      }
  } 

    hideAlert = () => {
      this.setState({
        showAlert: false
      });
    }

    componentDidMount(){
      if(this.props.navigation.getParam('theUser', 'guest') != 'guest'){
          this.setState({
            message: 'Welcome, '+ this.props.navigation.getParam('theUser', 'Guest').accountInfo.fullname + '!'
          });
      } 
    }

    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('theUser', 'guest');
        const { showAlert } = this.state;
        // if(user != 'guest' && user.collections != undefined){
        //     this.setState ={collections:user.collections}
        //     console.log(user.collections);
        // }
        return (

            <View style={styles.container}>
                <TouchableHighlight
                     style={[styles.button, {top:70, left:70}]}
                     onPress={()=>console.log('button clicked')}>
                     <Image style={{width:90, height:90}} source={require('../assets/account.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:180, left:93}]}>Account</Text>
                <TouchableHighlight
                     style={[styles.button, {top:70, left:190}]}
                     onPress={()=>{this.props.navigation.navigate('Map');}}>
                     <Image style={{width:90, height:90}} source={require('../assets/maps-icon.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:180, left:205}]}>Find Plane</Text>
                
                <TouchableHighlight
                     style={[styles.button, {top:230, left:190}]}
                     onPress={()=>console.log('button clicked')}>
                     <Text style={styles.text}>IDONKNOW</Text>
                </TouchableHighlight>

                <TouchableHighlight
                     style={[styles.button, {top:230, left:70}]}
                     onPress={()=>console.log('button clicked')}>
                     <Text style={styles.text}>IDONKNOW</Text>
                </TouchableHighlight>

                <TouchableHighlight
                     style={[styles.button, {top:380, left:70}]}
                     onPress={()=>console.log('button clicked')}>
                     <Text style={styles.text}>IDONKNOW</Text>
                </TouchableHighlight>

                {user != 'guest' && 
                <TouchableHighlight
                     style={[styles.button, {top:380, left: 190}]}
                     onPress={()=>{this.props.navigation.navigate('Collection', {collections: user.collections});}}>
                     <Image style={{width:70, height:70}} source={require('../assets/plane.png')}/>
                </TouchableHighlight>}
                {user != 'guest' && 
                <Text style={[styles.text,{top:480, left:205}]}>Collection</Text>}
                

                <AwesomeAlert
                  show={showAlert}
                  showProgress={false}
                  title={this.state.title}
                  message={this.state.message}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={true}
                  showCancelButton={true}
                  cancelText="Okay"
                  onCancelPressed={() => {
                    this.hideAlert();
                  }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text:{
    position:'absolute',
    fontSize:15,
    top:100,
    fontWeight:'bold',
    color:'#625E5E'
  },
  button:{
    position: 'absolute',
    width:100,
    height:100,
    borderWidth:0.5, 
    borderColor:'black',
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#625E5E'
  }
});
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, StyleSheet, TouchableHighlight } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import { bcrypt } from 'react-native-bcrypt';

export default class MenuScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showAlert: true,
          title: 'Hi!',
          message: 'Welcome, Guest!',
          signOut: "Sign Out"
        }
        this.showAlert = this.showAlert.bind(this);
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

    showAlert = (title, message) => {
      this.setState({
        showAlert: true,
        title: title,
        message: message
      });
    }

    hideAlert = () => {
      this.setState({
        showAlert: false
      });
    }

    componentDidMount(){
      if(userInfo != 'guest'){
          this.setState({
            message: 'Welcome, '+ userInfo.accountInfo.fullname + '!'
          });
      }else{
        this.setState({
          signOut: "Go Back Home"
        })
      }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                     style={[styles.button, {top:30, left:70}]}
                     onPress={()=>this.showAlert('Account Page','Sorry, Account Page is \ncurrently not working')}>
                     <Image style={{width:90, height:90}} source={require('../assets/account.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:140, left:93}]}>Account</Text>
                <TouchableHighlight
                     style={[styles.button, {top:30, left:190}]}
                     onPress={()=>{this.props.navigation.navigate('Map');}}>
                     <Image style={{width:90, height:90}} source={require('../assets/maps-icon.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:140, left:205}]}>Find Plane</Text>
                
                <TouchableHighlight
                     style={[styles.button, {top:190, left:190}]}
                     onPress={()=>this.showAlert('Help Page','Sorry, Help Page is \ncurrently not working')}>
                     <Image style={{width:70, height:70}} source={require('../assets/help.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:290, left:205}]}>Help</Text>
                <TouchableHighlight
                     style={[styles.button, {top:190, left:70}]}
                     onPress={()=>this.showAlert('Setting Page','Sorry, Setting Page is \ncurrently not working')}>
                     <Image style={{width:70, height:70}} source={require('../assets/setting.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:290, left:95}]}>Setting</Text>

                <TouchableHighlight
                     style={[styles.button, {top:340, left:70}]}
                     onPress={()=>this.showAlert('Alert Page','Sorry, Alert Page is \ncurrently not working')}>
                     <Image style={{width:70, height:70}} source={require('../assets/alert.png')} />
                </TouchableHighlight>
                <Text style={[styles.text,{top:445, left:105}]}>Alert</Text>
                {userInfo != 'guest' && 
                <TouchableHighlight
                     style={[styles.button, {top:340, left: 190}]}
                     onPress={()=>{this.props.navigation.navigate('Collection');}}>
                     <Image style={{width:70, height:70}} source={require('../assets/plane.png')}/>
                </TouchableHighlight>}
                {userInfo != 'guest' && 
                <Text style={[styles.text,{top:440, left:205}]}>Collection</Text>}
                
                <TouchableHighlight
                     style={{position:'absolute',alignItems: 'center', justifyContent: 'center',top:480, width:'100%'}}
                     onPress={()=>{
                      global.userInfo = 'guest';
                      this.props.navigation.navigate('Home')}}>
                    <Text style={{textDecorationLine:'underline', fontSize:18}}> {this.state.signOut} </Text>
                </TouchableHighlight>

                <AwesomeAlert
                  show={this.state.showAlert}
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
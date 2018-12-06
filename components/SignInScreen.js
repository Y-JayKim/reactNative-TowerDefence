import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, Text, View, StyleSheet, TouchableHighlight, Image, TextInput, Dimensions } from 'react-native';

import { fetchItems } from '../services/DatabaseInterface';

import AwesomeAlert from 'react-native-awesome-alerts';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



export default class SignInScreen extends Component {

    constructor() {
        super();
        this.state = {
          usernameText: "",
          passwordText: "",
          showAlert: false,
          title: 'Alert',
          message: 'This is default message'
        }
        this.submitPressed = this._submitPressed.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    static navigationOptions = { header: null }

    _submitPressed(){
      for(let i = 0; i < fetchItems.length; i++){
          let userInformation = fetchItems[i].accountInfo;

          if(userInformation != undefined){
            if(userInformation.username == this.state.usernameText && userInformation.password == this.state.passwordText){
                this.setState({
                  usernameText: "",
                  passwordText: ""
                });
                global.userInfo = fetchItems[i];
                this.props.navigation.navigate('Map');
                return true;
            }
          }
      }
      Keyboard.dismiss();
      this.showAlert('Incorrect user information');
      return false;
    }

    signIn = async () => {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId:
              //CREDENTIAL KEY HERE,
              "CREDENTIAL KEY NEEDED",
              //iosClientId: YOUR_CLIENT_ID_HERE,
              scopes: ["profile", "email"]
          })

          if (result.type === "success") {
            console.log(result.user);
            this.setState({
              theText: "Welcome: ",
              signedIn: true,
              name: result.user.name,
              photoUrl: result.user.photoUrl
            })
          } else {
            console.log("cancelled");
          }
        } catch (e) {
          console.log("error", e);
        }
    } 

    showAlert = (message) => {
      this.setState({
        showAlert: true,
        message: message
      });
    }

    hideAlert = () => {
      this.setState({
        showAlert: false
      });
    }

    render() {
      console.log(userInfo);
      const { showAlert } = this.state;
          return (
              <View style={styles.container}>
              <TouchableHighlight
                                style={styles.mapButton}
                                onPress={()=>{this.props.navigation.navigate('Home')}}>
                                <Text style={{fontSize:20, color:'maroon',fontFamily: 'Nunito-Bold',}}>Back</Text> 
                            </TouchableHighlight>
                  <Text style={styles.header}>Login</Text>
                  <View style={styles.views}>
                      <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => this.setState({usernameText:text})}
                          placeholder={"Username"}
                          value={this.state.usernameText}
                      />
                      <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => this.setState({passwordText:text})}
                          placeholder={"Password"}
                          secureTextEntry={true}
                          value={this.state.passwordText}
                      />
                      <TouchableHighlight
                          style={styles.buttons}
                          onPress={this.submitPressed}
                      >
                          <Text style={{color:'maroon',fontWeight:'bold'}}>Submit</Text>
                      </TouchableHighlight>
                  </View>

                  <TouchableHighlight
                    style={styles.extraButton}
                    onPress={()=>console.log("Sign In with Google")}>
                    <Image style={styles.image} source={require('../assets/google.png')}/>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.extraButton}
                    onPress={()=>console.log("Sign In with Facebook")}>
                    <Image style={styles.image} source={require('../assets/facebook.png')}/>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[styles.extraButton, {width:150,height:40}]}
                    onPress={()=>this.showAlert("          Too Bad         ")}>
                    <Text style={{color:'darkorange'}}>Forgot Password?</Text>
                  </TouchableHighlight>
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
    backgroundColor: 'darkcyan',
    alignItems: 'center',
    justifyContent:'center'
  },
  views:{
      backgroundColor: '#625E5E',
      width:300,
      height:240,
      justifyContent: 'center',
      alignItems: 'center',
      margin:50
  },
  buttons: {
        width:100,
        height: 50,
        backgroundColor:'darkorange',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'maroon',
        borderWidth:1,
        borderRadius:5,
        margin:10
  },
  extraButton: {
    alignItems: 'center',
    marginTop:10,

  },  
  textInput:{
      height: 50,
      width:270, 
      borderWidth: 1,
      padding:10,
      margin:10,
      borderColor:'white',
      color:'white'
  },
  image:{
    width:"100%",
    height:"100%",
    resizeMode: 'contain', 
    height:40, 
    width: 230
  },
  text:{
    fontSize:30,
    top:30
  },
    header: {
        fontSize:width/6,
        justifyContent:'center',
        color:'darkorange',
        marginBottom:20
    },
    mapButton: {
        
        width:70,
        height:50,
        backgroundColor:'darkorange',
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'flex-end',
        marginTop:40,
        marginRight:20
       
    },
});
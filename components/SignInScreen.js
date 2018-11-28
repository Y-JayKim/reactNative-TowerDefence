import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight, Image, TextInput, Alert } from 'react-native';

export default class SignInScreen extends Component {

    constructor() {
        super();
        this.state = {

        }
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sign In</Text>
                <TextInput
                    style={styles.textInput}
                    value="Username"
                />
                <TextInput
                    style={styles.textInput}
                    value="Password"
                />
                <TouchableHighlight
                     style={styles.button}
                     onPress={()=>{this.props.navigation.navigate('Menu', {theUser:'user'});}}>
                     <Text>Sign In</Text>
                </TouchableHighlight>
                <TouchableHighlight
                     style={{top:210}}
                     onPress={()=>console.log("Sign In with Google")}>
                     <Image style={styles.image} source={require('../assets/google.png')}/>
                </TouchableHighlight>
                <TouchableHighlight
                     style={{top:220}}
                     onPress={()=>console.log("Sign In with Facebook")}>
                     <Image style={styles.image} source={require('../assets/facebook.png')}/>
                </TouchableHighlight>
                <TouchableHighlight
                     style={{top:230}}
                     onPress={()=>Alert.alert('Message','Too Bad')}>
                     <Text>Forgot Password?</Text>
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
  textInput:{
    top:80,
    height: 40,
    width:200, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  button:{
    top:200, 
    width:100, 
    height:40, 
    backgroundColor:'skyblue',
    borderWidth:0.5, 
    borderColor:'black',
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
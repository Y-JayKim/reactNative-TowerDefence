import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Alert } from 'react-native';

export default class SignUpScreen extends Component {

    constructor() {
        super();
        this.state = {
            usernameText: "",
            passwordText:"",
            reTypeText:"",
            fullnameText:""
        }
        this.submitPressed = this._submitPressed.bind(this);
    }

    _submitPressed(){
        if(this.state.usernameText != "" && this.state.passwordText != "" && this.state.reTypeText != "" && this.state.fullnameText != ""){
            console.log("Filled every section");
            if(this.state.passwordText == this.state.reTypeText){
                console.log("Password matched");
            }else{
                Alert.alert("Message", "Password does not match");
            }
        }else{
            Alert.alert("Message", "Please fill out every section!");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.views}>
                    <Text style={styles.text}>Simple Sign Up</Text>
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
                        value={this.state.passwordText}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({reTypeText:text})}
                        placeholder={"Re-type your password"}
                        value={this.state.reTypeText}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({fullnameText:text})}
                        placeholder={"Fullname"}
                        value={this.state.fullnameText}
                    />
                    <TouchableHighlight
                        style={styles.buttons}
                        onPress={this.submitPressed}

                    >
                        <Text style={{color:'white',fontWeight:'bold'}}>Submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    views:{
        top:40,
        backgroundColor: '#625E5E',
        width:300,
        height:450,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width:100,
        height: 50,
        backgroundColor:'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:5,
        margin:10
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        margin:10,
        marginBottom:20
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
});
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image, Text, View, StyleSheet, TextInput, TouchableHighlight, Alert, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import { addItem, fetchItems } from '../services/DatabaseInterface';

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
        this.accountCreation = this._accountCreation.bind(this);
    }

    static navigationOptions = { header: null }

    _accountCreation(){
        for(let i = 0; i < fetchItems.length; i++){
            if(fetchItems[i].accountInfo.username == this.state.usernameText){
                Alert.alert('Message', 'username already exist!');
                return false;
            }
        }
        return true;
    }

    _submitPressed(){
        if(this.state.usernameText != "" && this.state.passwordText != "" && this.state.reTypeText != "" && this.state.fullnameText != ""){
            console.log("Filled every section");
            if(this.state.passwordText == this.state.reTypeText){
                console.log("Password matched");
                if(this.accountCreation()){
                    addItem({
                        username: this.state.usernameText,
                        password: this.state.passwordText,
                        fullname: this.state.fullnameText
                    });
                    this.props.navigation.goBack();
                    Alert.alert("Message", "Thank you!\nAccount has been Created");
                }
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
                <Text style={styles.header}>Sign Up</Text>
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
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({reTypeText:text})}
                        placeholder={"Re-type your password"}
                        secureTextEntry={true}
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
                        <Text style={{color:'maroon',fontWeight:'bold'}}>Submit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.buttons}
                        onPress={()=>{this.props.navigation.navigate('Home')}}>
                        <Text style={{color:'maroon',fontWeight:'bold'}}>Back</Text> 
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'darkcyan',
        alignItems: 'center',
        flex:1,
    },
    views:{
        backgroundColor: '#625E5E',
        width:300,
        height:400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width:100,
        height: 100,
        backgroundColor:'darkorange',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'maroon',
        borderWidth:1,
        borderRadius:5,
        margin:10,
        flex:0.4
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
    header: {
        fontSize:width/6,
        justifyContent:'center',
        color:'darkorange',
        margin:20
    }
});
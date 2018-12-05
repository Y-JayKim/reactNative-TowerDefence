import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import { bcrypt } from 'react-native-bcrypt';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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
      if(userInfo.accountInfo != 'guest'){
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
                <Image style={{ position:'absolute', flex:1,opacity:0.6, backgroundColor: '#E2E2E2', }} 
                  source={require('../assets/bg1.png')} 
                  resizeMode="repeat"
                />
                <View style={styles.menuBox}>
                <TouchableHighlight
                     style={[styles.button]}
                     onPress={()=>this.showAlert('Account Page','Sorry, Account Page is \ncurrently not working')}>
                     <Image style={{width:90, height:90, justifyContent:'center', alignItems:'center'}} source={require('../assets/account.png')} />
                </TouchableHighlight>
                <Text style={[styles.text]}>Account</Text>
                </View>
                <View style={styles.menuBox}>
                <TouchableHighlight
                     style={[styles.button]}
                     onPress={()=>{this.props.navigation.navigate('Map');}}>
                     <Image style={{width:90, height:90, justifyContent:'center', alignItems:'center'}} source={require('../assets/maps-icon.png')} />
                </TouchableHighlight>
                <Text style={[styles.text]}>Find Plane</Text>
                </View>
                <View style={styles.menuBox}>
                <TouchableHighlight
                     style={[styles.button]}
                     onPress={()=>this.showAlert('Help Page','Sorry, Help Page is \ncurrently not working')}>
                     <Image style={{width:70, height:70, justifyContent:'center', alignItems:'center'}} source={require('../assets/help.png')} />
                </TouchableHighlight>
                <Text style={[styles.text]}>Help</Text>
                </View>
                <View style={styles.menuBox}>
                <TouchableHighlight
                     style={[styles.button]}
                     onPress={()=>this.showAlert('Setting Page','Sorry, Setting Page is \ncurrently not working')}>
                     <Image style={{width:70, height:70, justifyContent:'center', alignItems:'center'}} source={require('../assets/setting.png')} />
                </TouchableHighlight>
                <Text style={[styles.text]}>Setting</Text>
                </View>
                <View style={styles.menuBox}>
                <TouchableHighlight
                     style={[styles.button]}
                     onPress={()=>this.showAlert('Alert Page','Sorry, Alert Page is \ncurrently not working')}>
                     <Image style={{width:70, height:70}} source={require('../assets/alert.png')} />
                </TouchableHighlight>
                <Text style={[styles.text]}>Alert</Text>
                </View>
                <View style={styles.menuBox}>
                <TouchableHighlight
                     style={[styles.button]}
                     onPress={()=>{this.props.navigation.navigate('Collection');}}>
                     <Image style={{width:70, height:70, justifyContent:'center', alignItems:'center'}} source={require('../assets/plane.png')}/>
                </TouchableHighlight>
                <Text style={[styles.text]}>Collection</Text>
                </View>
                <TouchableHighlight
                     style={{alignItems: 'center', justifyContent: 'center', width:'100%',marginTop:20}}
                     onPress={()=>{
                      global.userInfo = guestDefault;
                      this.props.navigation.navigate('Home')}}>
                    <Text style={{bottom: 0, left: 10, textDecorationLine:'underline', fontSize:18, fontWeight:'bold'}}> {this.state.signOut} </Text>
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
    ...StyleSheet.absoluteFillObject,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  text:{
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'white',
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: 1.25, height: 1.25},
    textShadowRadius: 1,
  },
  button:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    margin:30,
    marginBottom:9,
    width:100,
    height:100,
    borderWidth:1.5, 
    borderColor:'black',
    borderRadius:10,
    backgroundColor: '#625E5E'
  },
  menuBox: {
    height:150,
    width:width/2,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  }
});
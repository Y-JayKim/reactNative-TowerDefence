import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Font } from 'expo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  constructor() {
      super();
      this.state = {
        fontLoaded: false,
      }
      this.signInPressed = this.signInPressed.bind(this);
  }
  static navigationOptions = { header: null }

  signInPressed(){
    if(userInfo == 'guest'){
      this.props.navigation.navigate('SignIn');
    }else{
      this.props.navigation.navigate('Menu');
    }
    
  }

  async componentDidMount() {
    await Font.loadAsync({
     
      'BebasNeueBold': require('../assets/fonts/BebasNeueBold.otf'),
      'BebasNeue-Regular': require('../assets/fonts/BebasNeueRegular.otf'),
      'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
      'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

    render() {
        return (
          
          <View>
          {
                this.state.fontLoaded ? (
            <View style={styles.container}>
                  <View style={styles.container2}>
                    <Text style={[styles.textStyle, {marginTop: 40 }]}>
                      Airplane
                    </Text>
                    <Text style={[styles.textStyle ]}>
                      Above
                    </Text>
                    <Text style={[styles.textStyle]}>
                      Me
                    </Text>
                    
                    <View style={styles.endBox}>
                    
                    <View style={styles.bottomContainer}>
                      
                      
                      <TouchableHighlight
                       style={styles.button}
                       onPress={()=>{this.props.navigation.navigate('SignUp');}}>
                       <Text style={styles.buttonText}> Sign Up </Text>
                      </TouchableHighlight>

                      <TouchableHighlight
                       style={styles.button}
                       onPress={()=>this.signInPressed()}>
                       <Text style={styles.buttonText}> Login </Text>
                      </TouchableHighlight>
    
                  </View>
                  <TouchableHighlight
                     style={styles.guestButton}
                     onPress={()=>{this.props.navigation.navigate('Menu');}}>
                     <Text style={styles.guestButtonText}> View as Guest </Text>
                    </TouchableHighlight>
                  </View>
                  </View>
            </View>
            ) : null
              }
              </View>

            
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'darkcyan',
    height:height,
    width:width,
    justifyContent:'flex-start'
  },
  bottomContainer: {
    width:width/1.3,
    height:height/8,
    flexDirection:'row',
    marginTop:height/4,
    justifyContent:'space-between'
  },
 
  textStyle: {
    color:'darkorange',
    fontFamily: 'BebasNeueBold',
    width:'auto',
    height:height/8,
    alignSelf:'flex-start',
    fontSize: width/4,
    marginLeft:width/10,
    
  },
  button: {
    width:'43%',
    height:'100%',
    borderWidth:3,
    borderColor: "maroon",
    
    marginLeft:10,
    marginRight:10,
    backgroundColor:'darkorange',
    alignItems:'center',
    justifyContent:'center',
    
  },
  buttonText: {
    fontSize:width/14, 
    color:'maroon',
    fontFamily: 'Nunito-Bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  guestButton: {  
    
    height:60,
    
    alignSelf:'center',
    justifyContent:'center', 
    marginTop:20,
    
  },
  guestButtonText: {
    fontSize:width/13, 
    color:'darkorange',
    fontFamily: 'Nunito-Regular',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  endBox: {
    justifyContent:'flex-end',
    alignSelf:'center'
  }
});

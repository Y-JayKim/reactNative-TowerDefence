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
                  <Image style={{position:'absolute', height:'100%',opacity:0.6, backgroundColor: '#E2E2E2'}} 
                    source={require('../assets/bg1.png')} 
                    resizeMode="repeat"
                  />
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
                    <View style={styles.image}>
                      <Image source={{uri: 'https://s17-us2.startpage.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSd4xfU6KPjWq2217vnlkY1TYB2WwNkBLTZq1nQSqFgbB4ED49jzQ&sp=55b00af7d6ce4e61491a91512b7fe94f&anticache=599360'}} />
                    </View>
                    
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
            ) : null
              }
              </View>

            
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#E2E2E2',
    height:height,
    justifyContent:'flex-start'
  },
  bottomContainer: {
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center', 
  },
  image: {
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center', 
    height:120,
    width:100,
    margin:20,
  },
  textStyle: {
    color:'#625E5E',
    fontFamily: 'BebasNeueBold',
    width:'auto',
    height:79,
    alignSelf:'flex-start',
    fontSize: 80,
    marginLeft:20,
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1.5, height: 1.5},
    textShadowRadius: 5,
  },
  button: {
    width:130,
    height:70,
    borderWidth:3,
    borderColor: "white",
    borderRadius:5,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#625E5E',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'flex-end',
  },
  buttonText: {
    fontSize:20, 
    color:'white',
    fontFamily: 'Nunito-Bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  guestButton: {  
    height:40, 
    width:200,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center', 
    marginTop:10
  },
  guestButtonText: {
    fontSize:20, 
    color:'#625E5E',
    fontFamily: 'Nunito-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 5,
  },
});

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
    }
 static navigationOptions = { header: null }

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
                    <View style={styles.image}>
                      <Image source={{uri: 'https://s17-us2.startpage.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSd4xfU6KPjWq2217vnlkY1TYB2WwNkBLTZq1nQSqFgbB4ED49jzQ&sp=55b00af7d6ce4e61491a91512b7fe94f&anticache=599360'}} />
                    </View>
                    
                    <View style={styles.bottomContainer}>
                      
                      
                      <TouchableHighlight
                       style={[styles.button]}
                       onPress={()=>{this.props.navigation.navigate('SignUp');}}>
                       <Text style={styles.buttonText}> Sign Up </Text>
                      </TouchableHighlight>

                      <TouchableHighlight
                       style={[styles.button]}
                       onPress={()=>{this.props.navigation.navigate('SignIn');}}>
                       <Text style={styles.buttonText}> Login </Text>
                      </TouchableHighlight>
                      
                

                
                  </View>
                  <TouchableHighlight
                     style={styles.guestButton}
                     onPress={()=>{this.props.navigation.navigate('Menu',{theUser:'guest'});}}>
                     <Text style={[styles.buttonText, {color: '#625E5E', fontFamily: 'Nunito-Regular'}]}> View as Guest </Text>
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
    justifyContent:'flex-start',

  },
  bottomContainer: {
    
    
    flexDirection:'row',
   
    alignItems:'flex-end',
    justifyContent:'center', 
  },
  image: {
    backgroundColor:'red',
    
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
    padding:4,
    backgroundColor: 'white',
    marginLeft:20
  },

  button: {
    width:130,
    height:70,
    borderWidth:7,
    borderColor: "white",
    borderRadius:50,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#C4C4C4',
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
    justifyContent:'flex-end', 
    marginTop:10

    
    

    
    
    
  }
});

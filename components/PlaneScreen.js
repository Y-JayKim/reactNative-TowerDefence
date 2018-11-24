import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Font } from 'expo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class PlaneScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          fontLoaded: false,
        }
    }
 static navigationOptions = { header: null }

  async componentDidMount() {
    await Font.loadAsync({
 
      'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
      'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }


    render() {
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const image = navigation.getParam('image', 'noimage');
      const date = navigation.getParam('date_collected', 'no date');
      const location = navigation.getParam('location', 'no location');
        return (
          
          <View>
          {
                this.state.fontLoaded ? (
              <View style={styles.container}>
                <View style={styles.titleAndButton}>
                    <TouchableHighlight
                        style={styles.backButton}
                        onPress={()=>{this.props.navigation.navigate('Collection')}}>
                            <Text>back</Text> 
                    </TouchableHighlight>
                <Text style={styles.planeTitle}>{name}</Text>
                </View>
                <Image style={styles.image} source={{uri: image}}/>
                <Text style={styles.text}>Found on: {date}</Text>
                <Text style={styles.text}>Location: {location}</Text>
                
                <TouchableHighlight
                    style={[styles.button, ]}>
                    <Text style={{color:'white', 
                                fontSize:22, 
                                fontFamily:'Nunito-Bold',
                                justifyContent:'center',
                                alignSelf:'center',
                                backgroundColor:'red'
                                }}> Delete </Text>
                </TouchableHighlight>
              </View>
            ) : null
              }
              </View>

            
        );
    }
}

const styles = StyleSheet.create({
  container: {
        backgroundColor: '#E2E2E2',
        height: height,
        flexDirection:'column'
      
    },
    image: {
      width:width/1.1,
      height:200,
      backgroundColor:'white',
      alignSelf:'center'
    },
    planeTitle: {
        color: '#625E5E',
        fontSize: 40,
        margin: 30,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        fontFamily: 'Nunito-Bold',
        backgroundColor: 'white',
        alignSelf: 'center',
        
    },
    text: {
        marginTop:7,
        marginLeft:7,
        flexDirection:'column',
        fontSize:22,
        fontFamily:'Nunito-Bold',
        justifyContent:'center',
        color:'#625E5E',
        alignSelf:'center',
       
        textAlign: 'center',
    },
    button: {
        width:130,
        height:70,
        borderWidth:7,
        borderColor: "white",
        borderRadius:50,
        marginRight:30,
        marginBottom:30,
        backgroundColor:'#C4C4C4',
        alignSelf:'flex-end',
        
        marginTop: 'auto',
        alignItems:'center',
        
    },
    backButton: {
        width:70,
        height:50,
        borderWidth:7,
        borderColor: "white",
        borderRadius:50,
        
        backgroundColor:'#C4C4C4',
        alignSelf:'flex-start',
        
        margin: 20,
       
        
    },
    titleAndButton: {
        flexDirection:'row'
    }
 
});
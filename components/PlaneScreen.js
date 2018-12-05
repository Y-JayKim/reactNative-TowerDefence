import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Font } from 'expo';

import { setCollections } from '../services/DatabaseInterface';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class PlaneScreen extends React.Component {
    constructor(props) {
        super(props);
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
  deletePlanes = () => {

    for(let item in userInfo.collections){
        if(userInfo.collections[item].icao == this.state.icao){
            console.log(this.state.icao);
            userInfo.collections.splice(item,1)
            
            if(userInfo.accountInfo != 'guest'){
                setCollections(userInfo.accountInfo.username, '', userInfo.collections)
            }
            
        }
    }
    this.props.navigation.navigate('Menu');
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
              <TouchableHighlight
                        style={styles.backButton}
                        onPress={()=>{this.props.navigation.navigate('Collection')}}>
                            <Text style={{fontSize:20, color:'maroon',fontFamily: 'Nunito-Bold',}}>Back</Text> 
                    </TouchableHighlight>

                <View style={styles.titleAndButton}>
                <Text style={styles.planeTitle}>{name}</Text>
                    
                
                </View>
                
                <View style={styles.middleCont}>
                <Image style={styles.image} source={{uri: image}}/>
                <Text style={styles.text}>Found on: {date}</Text>
                <Text style={styles.text}>Location: {location}</Text>
                </View>
                <TouchableHighlight
                    style={[styles.button, {backgroundColor:'red'}]}>
                    <Text style={{color:'white', 
                                fontSize:22, 
                                fontFamily:'Nunito-Bold',
                                borderRadius:20,
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
        backgroundColor: 'darkcyan',
        height: height,
        flexDirection:'column',

      
    },
    image: {
      width:width/1.5,
      height:width/2.5,
      backgroundColor:'white',
      alignSelf:'center',
      margin:30
    },
    planeTitle: {
        fontFamily: 'Nunito-Bold',
        color: 'darkorange',
        fontSize: 50,
        margin: 30,
        justifyContent: 'flex-start',
        alignSelf:'center',
        textAlign:'center'
        
    },
    text: {
        marginTop:7,
        marginLeft:7,
        flexDirection:'column',
        fontSize:30,
        fontFamily:'Nunito-Bold',
        
        color:'darkorange',
        
       
        textAlign: 'center',
    },
    button: {
        width:130,
        height:70,
        
        margin:40,
        backgroundColor:'#C4C4C4',
        alignSelf:'flex-end',
        justifyContent:'center',
        marginTop: 'auto',
        alignItems:'center',
        
    },
    backButton: {
        width:70,
        height:50,
        backgroundColor:'darkorange',
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'flex-end',
        margin: 40,
       
        
    },
    titleAndButton: {
        flexDirection:'row',
        height:height/15,
        justifyContent:'center',
        
    },
    middleCont: {
       
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
 
});
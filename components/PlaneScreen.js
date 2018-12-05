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
          name: props.navigation.getParam('name', 'NO-ID'),
          image: props.navigation.getParam('image', 'noimage'),
          date: props.navigation.getParam('date_collected', 'no date'),
          location: props.navigation.getParam('location', 'no location'),
          icao: props.navigation.getParam('icao', 'No ICAO')
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
                <Text style={styles.planeTitle}>{this.state.name}</Text>
                </View>
                <Image style={styles.image} source={{uri:this.state.image}}/>
                <Text style={styles.text}>Found on: {this.state.date}</Text>
                <Text style={styles.text}>Location: {this.state.location}</Text>
                
                <TouchableHighlight
                    onPress={()=>this.deletePlanes()}
                    style={[styles.button,{alignItems: 'center',justifyContent: 'center'}]}>
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
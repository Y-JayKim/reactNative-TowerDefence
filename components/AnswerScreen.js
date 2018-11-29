import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Font } from 'expo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class AnswerScreen extends React.Component {
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
        const name = navigation.getParam('name', 'no name');
        const image = navigation.getParam('image', 'noimage');
        const date = navigation.getParam('date_collected', 'no date');
        const location = navigation.getParam('location', 'no location');



        const correctView = (<View>
                                <Text style={styles.title}> Correct! </Text>
                                <Image source={{uri: image}} style={styles.planeImage}/>
                                <Text style={styles.text}>Would you like to add the plane to your hangar?</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableHighlight
                                        style={[styles.button]}
                                        onPress={()=>{
                                            this.props.navigation.navigate('Collection', {
                                            name: name,
                                            date_collected: date,
                                            location: location,
                                            image: image
                                
                                            })
                                        }}>
                                        <Text style={styles.buttonText}> Yes </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        style={[styles.button]}
                                        onPress={()=>{this.props.navigation.navigate('Collection');}}>
                                        <Text style={styles.buttonText}> No </Text>
                                    </TouchableHighlight>

                                </View>
                            </View>)
        const wrongView = (<View>
                                <Text style={styles.title}> Wrong! </Text>
                                <View style={styles.planeImage}></View>
                                <Text style={styles.text}>The plane was not {name}!</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableHighlight
                                        style={[styles.button]}
                                        onPress={()=>{this.props.navigation.navigate('Collection')}}>
                                        <Text style={styles.buttonText}> Hangar </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        style={[styles.button]}
                                        onPress={()=>{this.props.navigation.navigate('Map');}}>
                                        <Text style={styles.buttonText}> Map </Text>
                                    </TouchableHighlight>

                                </View>
                            </View>)

        let message;
        if (name == 'Plane 1') {
            message = correctView;
        } else {
            message = wrongView;
        }
        return (
          
          <View>
          {
                this.state.fontLoaded ? (
              <View style={styles.container}>{message}</View>
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
    title: {
        fontFamily: 'Nunito-Bold',
        color: '#625E5E',
        fontSize: 40,
        margin: 30,
        justifyContent: 'flex-start',
        alignSelf:'center',
        backgroundColor:'white'
    },
    planeImage: {
        width:width/1.3,
        height:width/1.3,
        backgroundColor:'white',
        borderRadius:width/2.7,
        alignSelf:'center'
    },
    button: {
        width:120,
        height:70,
        borderWidth:7,
        borderColor: "white",
        borderRadius:50,
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
    text: {
        fontFamily: 'Nunito-Bold',
        color: '#625E5E',
        fontSize: 20,
        margin: 30,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        justifyContent:'flex-end',
        marginTop:'auto',
        marginBottom:20,
        alignSelf:'center',
        flexDirection:'row',
        width:width/1.1,
        height:height/3.5,
        flexDirection:'row',
        
        justifyContent: 'space-between',
    }

 
});
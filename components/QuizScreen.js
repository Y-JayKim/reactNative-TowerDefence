import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Font } from 'expo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class QuizScreen extends Component {

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
        
        return (
            <View>
            {
                this.state.fontLoaded ? (

                <View style={styles.container}>
                    <Text style={styles.title}>What kind of plane is it?</Text>

                    <View style={styles.answerButtons}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                              
                              this.props.navigation.navigate('Answer', {
                                name: 'Plane 1',
                                date_collected: '2018-11-24',
                                location: 'I wish i was in antartica',
                                image: 'https://media.wired.com/photos/5b3ac9899a7504731f8818f8/master/pass/Quiet-NASA-Transpo.jpg'
                                
                            })
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 1</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                              
                              this.props.navigation.navigate('Answer', {
                                name: 'Plane 2'
                                
                            })
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 2</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                              
                              this.props.navigation.navigate('Answer', {
                                name: 'Plane 3'
                                
                            })
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 3</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                              
                              this.props.navigation.navigate('Answer', {
                                name: 'Plane 4'
                                
                            })
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 4</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                ) : null
            
            }

            </View>
        )
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
        fontSize: 25,
        margin: 30,
        justifyContent: 'flex-start',
    },
    answerButtons: {
        justifyContent:'flex-end',
        marginTop:'auto',
        marginBottom:20,
        alignSelf:'center',
        
        width:width/1.1,
        height:height/3.5,
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    button: {
        backgroundColor:'#C4C4C4',
        width:'45%',
        borderWidth:7,
        borderColor: "white",
        borderRadius:50,
        height:'45%',
        margin: 5,
        alignItems:'center',
        justifyContent:'center',
        


    },
    buttonText: {
        fontSize:20,
        fontFamily: 'Nunito-Bold',
        color: 'white',
        justifyContent:'center',
        alignSelf:'center'
    }
});
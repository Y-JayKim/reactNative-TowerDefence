import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions, Modal, Image } from 'react-native';
import { Font } from 'expo';

import { addItem, fetchItems, addCollections } from '../services/DatabaseInterface';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class QuizScreen extends Component {

    constructor() {
        super();
        this.state = {
          fontLoaded: false,
          wrongVisible: false,
          correctVisible: false,
          mainVisible: true,
          answerName: ''
        }
        this.setCorrectVisible = this.setCorrectVisible.bind(this);
        this.setWrongVisible = this.setWrongVisible.bind(this);
        this.setMainVisible = this.setMainVisible.bind(this);
    }
    static navigationOptions = { header: null }

    async componentDidMount() {
    await Font.loadAsync({
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
        'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
    }

    setCorrectVisible() {
        this.setState({correctVisible: true});
    }
    setWrongVisible() {
        this.setState({wrongVisible: true});
    }
    setMainVisible() {
        this.setState({mainVisible: false});
    }

    saveToCollection = () =>{
        for(let i = 0; i < fetchItems.length; i++){
            if(fetchItems[i].accountInfo.username == userInfo.accountInfo.username){
                if(fetchItems[i].collections == "null"){
                    addCollections(
                        i
                    ,{
                        key:'4',
                        name: 'Plane 1',
                        date_collected: '2018-11-24',
                        location: 'I wish i was in antartica',
                        image: 'https://media.wired.com/photos/5b3ac9899a7504731f8818f8/master/pass/Quiet-NASA-Transpo.jpg'
                    })
                }else{
                    addCollections(userInfo.accountInfo.username, String(fetchItems[i].collections.length),
                        {
                            key:String(fetchItems[i].collections.length),
                            name: 'Plane 1',
                            date_collected: '2018-11-24',
                            location: 'I wish i was in antartica',
                            image: 'https://media.wired.com/photos/5b3ac9899a7504731f8818f8/master/pass/Quiet-NASA-Transpo.jpg'
                        }
                    );
                }
                
            }
        }

        this.setState({correctVisible: false})

        this.props.navigation.navigate('Collection', {
            name: 'Plane 1',
            date_collected: '2018-11-24',
            location: 'I wish i was in antartica',
            image: 'https://media.wired.com/photos/5b3ac9899a7504731f8818f8/master/pass/Quiet-NASA-Transpo.jpg'
        });
    }
  
    render() {  
        
        return (
            <View>
            {
                this.state.fontLoaded ? (
                
                <View style={styles.container}>
                <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.mainVisible}
                        onRequestClose={ () => {this.setState({mainVisible: false})}}
                    >
                    <Text style={styles.title}>What kind of plane is it?</Text>

                    <View style={styles.answerButtons}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.setCorrectVisible()
                                this.setMainVisible()
                                this.state.answerName = 'Plane 1'
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 1</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.state.answerName = 'Plane 2'
                                this.setWrongVisible()
                                this.setMainVisible()
                                
                            
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 2</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.state.answerName = 'Plane 3'
                                this.setWrongVisible()
                                this.setMainVisible()

                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 3</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.state.answerName = 'Plane 4'
                                this.setWrongVisible()
                                this.setMainVisible()
                              
                            }}
                            >
                            <Text style={styles.buttonText}>Plane 4</Text>
                        </TouchableHighlight>
                   
                   
                    </View>
                     </Modal>

                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.correctVisible}
                        onRequestClose={ () => {this.setState({correctVisible: false})}}
                    >
                    <View>
                                <Text style={styles.title}> Correct! </Text>
                                <Image source={{uri: 'https://media.wired.com/photos/5b3ac9899a7504731f8818f8/master/pass/Quiet-NASA-Transpo.jpg'}} style={styles.planeImage}/>
                                <Text style={styles.text}>Would you like to add the plane to your hangar?</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableHighlight
                                        style={[styles.buttonAnswer]}
                                        onPress={()=>this.saveToCollection()}
                                    >
                                        <Text style={styles.buttonText}> Yes </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        style={[styles.buttonAnswer]}
                                       
                                        onPress={()=>{this.props.navigation.navigate('Collection');
                                            this.setState({correctVisible: false})
                                        }}>
                                        <Text style={styles.buttonText}> No </Text>
                                    </TouchableHighlight>

                                </View>
                            </View>

                    </Modal>

                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.wrongVisible}
                        onRequestClose={ () => {this.setState({wrongVisible: false})}}
                      >
                      <View>
                                <Text style={styles.title}> Wrong! </Text>
                                <View style={styles.planeImage}></View>
                                <Text style={styles.text}>The plane was not {this.state.answerName}!</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableHighlight
                                    
                                        style={[styles.buttonAnswer]}
                                        
                                        onPress={()=>{this.props.navigation.navigate('Collection')
                                    this.setState({wrongVisible: false})}}>
                                        <Text style={styles.buttonText}> Hangar </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                     
                                        style={[styles.buttonAnswer]}
                                       
                                        onPress={()=>{this.props.navigation.navigate('Map');
                                    this.setState({wrongVisible: false})}}>
                                        <Text style={styles.buttonText}> Map </Text>
                                    </TouchableHighlight>

                                </View>
                            </View>

                      </Modal>

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
        backgroundColor:'#625E5E',
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
    },
    planeImage: {
        width:width/1.3,
        height:width/1.3,
        backgroundColor:'white',
        borderRadius:width/2.7,
        alignSelf:'center'
    },
    answerButton: {
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
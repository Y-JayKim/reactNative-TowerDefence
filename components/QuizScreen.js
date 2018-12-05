import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions, Modal, Image } from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';

import { AVEDGE_API_KEY, GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_CX } from '../db';
import { fetchItems, addCollections, setCollections } from '../services/DatabaseInterface';
import aircraftModels from '../assets/aircraftModels.js';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let today = new Date().toISOString().slice(0, 10)

export default class QuizScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false,
          wrongVisible: false,
          correctVisible: false,
          mainVisible: true,
          answerName: '',
          icao: this.props.navigation.getParam('icao', 'NO ICAO'),
          questions:[],
          name: '',
          lat: 0,
          long: 0,
          picture: '',
          keyNumber: 9999,
          correctAnswer: '',
          qName:'What is the aircraft model?',
          promiseIsResolved:false
        }
        this.setCorrectVisible = this.setCorrectVisible.bind(this);
        this.setWrongVisible = this.setWrongVisible.bind(this);
        this.setMainVisible = this.setMainVisible.bind(this);
        this.getAircraftImage((call) => {
            this.getAnswers(call)

        });
        
    }
    static navigationOptions = { header: null }
        

    async componentDidMount() {
        await Font.loadAsync({
            'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
            'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
        });

        this.setState({ 
            fontLoaded: true,
            name: this.props.navigation.getParam('callsign', 'no name'),
            lat:this.props.navigation.getParam('lat', 'no lat'),
            long: this.props.navigation.getParam('long', 'no long'),
            picture: this.props.navigation.getParam('picture', 'no picture'),
            keyNumber: this.props.navigation.getParam('keyNumber', '9999') 
        });
        
        
        
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

    getAircraftImage(callback) {
        console.log('quiz on \'' + this.state.icao + '\'');
        fetch('https://aviation-edge.com/v2/public/airplaneDatabase?key=' + AVEDGE_API_KEY + '&hexIcaoAirplane=' + this.state.icao)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response && response.length && !("error" in response)) {
                let productionLine = response[0].productionLine;
                this.setState({correctAnswer: productionLine})
                console.log(productionLine);
                fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_CX}&q=${productionLine}&num=1&searchType=image`)
                .then((response2) => response2.json())
                .then((response2) => {
                    if (response2) {
                        console.log(response2.items[0].image.thumbnailLink);
                        this.setState({aircraftImageURL: response2.items[0].image.thumbnailLink});
                        
                    }

                })
            }
            else {
                console.log('fallback');
                this.setState({qName:'How high is the aircraft?'})
                this.setState({aircraftImageURL: 'https://cdn0.iconfinder.com/data/icons/airplane-safety/512/xxx034-2-512.png'});
            }
            this.setState({promiseIsResolved: true})
            callback(this.state.qName)
            
        })
    }

    getAnswers(qName) {
        console.log('qname is: '+ qName);
        if (qName == 'What is the aircraft model?'){
            console.log(this.state.correctAnswer);
        
            this.state.questions.push(this.state.correctAnswer)
            for(i = 0; i < 3; i++){
                this.state.questions.push(aircraftModels.aircraftModels[Math.floor(Math.random()*aircraftModels.aircraftModels.length)])
            }
        }else {
            const { navigation } = this.props;
            const answers = navigation.getParam('answers', 'no answers');
            this.setState({correctAnswer:answers['correct'][0]})
            this.state.questions.push(answers['correct'][0])
            for(i = 0; i < 3; i++){
                this.state.questions.push(Math.round( ((Math.random()*2 - 1) * 1000) * 10 ) / 10)
            }
            console.log('questions is numbers: '+ this.state.questions);

        }
        this.state.questions.sort(() => Math.random() - 0.5);
        this.forceUpdate()
    }

    saveToCollection = () =>{
        // const resetAction = NavigationActions.reset({
        //       index: 0,
        //       actions: [NavigationActions.navigate({routeName: 'Collection'})],
        //       key: null,
        // });
        if(userInfo.accountInfo == 'guest'){
            if(userInfo.collections == "null"){

                userInfo.collections = [{
                                            name: this.state.correctAnswer,
                                            key:0,
                                            date_collected: today,
                                            location: this.state.lat + ' ' + this.state.long,
                                            image: this.state.aircraftImageURL,
                                            icao: this.props.navigation.getParam('icao', 'NO ICAO')
                                        }]
            }else{
                userInfo.collections.push({
                                            name: this.state.correctAnswer,
                                            key: this.state.keyNumber,
                                            date_collected: today,
                                            location: this.state.lat + ' ' + this.state.long,
                                            image: this.state.aircraftImageURL,
                                            icao: this.props.navigation.getParam('icao', 'NO ICAO')
                                        })
            }
        }else{
            for(let i = 0; i < fetchItems.length; i++){
                if(fetchItems[i].accountInfo.username == userInfo.accountInfo.username){
                    if(userInfo.collections == "null"){
                        setCollections(
                            userInfo.accountInfo.username, String(0),
                            {
                                name: this.state.correctAnswer,
                                key:0,
                                date_collected: today,
                                location: this.state.lat + ' ' + this.state.long,
                                image: this.state.aircraftImageURL,
                                icao: this.props.navigation.getParam('icao', 'NO ICAO')
                            }
                        )
                        i = fetchItems.length;
                    }else{
                        addCollections(userInfo.accountInfo.username, this.state.keyNumber,
                            {
                                name: this.state.correctAnswer,
                                key: this.state.keyNumber,
                                date_collected: today,
                                location: this.state.lat + ' ' + this.state.long,
                                image: this.state.aircraftImageURL,
                                icao: this.props.navigation.getParam('icao', 'NO ICAO')
                            }
                        );
                        i = fetchItems.length;
                    }
                }
            }
        }
        

        this.setState({correctVisible: false})
        this.props.navigation.navigate('Collection')
        this.props.navigation.state.routeName = 'Collection';
        // this.props.navigation.dispatch(resetAction);
    }

    onBackButtonPressAndroid = () => {
        
    };
    
    render() {  
        
        console.log(this.state.questions);
        if(!this.state.promiseIsResolved){return null}

        // if(this.state.correctVisible == false && this.state.mainVisible == false && this.state.wrongVisible == false && this.props.navigation.state.routeName == 'Quiz'){
        //     this.props.navigation.navigate("Menu");
        // }

        return (
            <View>
            {
                this.state.fontLoaded ? (
                
                <View style={styles.container}>
                <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.mainVisible}
                        onRequestClose={ () => {this.setState({mainVisible: true})}}
                    >

                    
                    <TouchableHighlight
                                style={styles.mapButton}
                                onPress={()=>{this.props.navigation.navigate('Map')}}>
                                <Text style={{fontSize:20, color:'maroon',fontFamily: 'Nunito-Bold',}}>Map</Text> 
                            </TouchableHighlight>
                        <View style={styles.titleAndButton}>
                            
                        <Text style={styles.title}>{this.state.qName}</Text>
                    </View>
                    

                    <View style={styles.aircraftView}>
                        <Image 
                            source={{uri: this.state.aircraftImageURL}}
                            style={styles.aircraftImage}
                        />
                    </View>

                    <View style={styles.answerButtons}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                if (this.state.questions[0] == this.state.correctAnswer){
                                    if (typeof this.state.correctAnswer === 'number'){
                                        this.setState({correctAnswer: this.state.name})
                                    }
                                    this.setCorrectVisible()
                                } else {
                                    this.setWrongVisible()
                                }
                                
                                this.setMainVisible()
                                this.state.answerName = this.state.questions[0]
                              
                            }}
                            >
                            <Text style={styles.buttonText}>{this.state.questions[0]}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                if (this.state.questions[1] == this.state.correctAnswer){
                                    if (typeof this.state.correctAnswer === 'number'){
                                        this.setState({correctAnswer: this.state.name})
                                    }
                                    this.setCorrectVisible()
                                } else {
                                    this.setWrongVisible()
                                }
                                this.state.answerName = this.state.questions[1]
                                
                                this.setMainVisible()
                            }}
                            >
                            <Text style={styles.buttonText}>{this.state.questions[1]}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.state.answerName = this.state.questions[2]
                                if (this.state.questions[2] == this.state.correctAnswer){
                                    if (typeof this.state.correctAnswer === 'number'){
                                        this.setState({correctAnswer: this.state.name})
                                    }
                                    this.setCorrectVisible()
                                } else {
                                    this.setWrongVisible()
                                }
                                this.setMainVisible()                  
                            }}
                            >
                            <Text style={styles.buttonText}>{this.state.questions[2]}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                if (this.state.questions[3] == this.state.correctAnswer){
                                    if (typeof this.state.correctAnswer === 'number'){
                                        this.setState({correctAnswer: this.state.name})
                                    }
                                    this.setCorrectVisible()
                                } else {
                                    this.setWrongVisible()
                                }
                                this.state.answerName = this.state.questions[3]
                               
                                this.setMainVisible()
                              
                            }}
                            >
                            <Text style={styles.buttonText}>{this.state.questions[3]}</Text>
                        </TouchableHighlight>
                   
                   
                    </View>
                     </Modal>

                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.correctVisible}
                        onRequestClose={()=>this.setState({correctVisible: false})}
                    >
                    <View>
                                <Text style={styles.title}> Correct! </Text>
                                <Image source={{uri: this.state.aircraftImageURL}} style={styles.planeImage}/>
                                <Text style={styles.text}>Would you like to add the plane to your hangar?</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableHighlight
                                        style={[styles.button]}
                                        onPress={()=>this.saveToCollection()}>
                                        <Text style={styles.buttonText}> Yes </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        style={[styles.button]}
                                       
                                        onPress={()=>{
                                            this.setState({correctVisible: false})
                                            this.props.navigation.navigate('Collection');
                                            
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
                                    
                                        style={[styles.button]}
                                        
                                        onPress={()=>{this.props.navigation.navigate('Collection')
                                    this.setState({wrongVisible: false})}}>
                                        <Text style={styles.buttonText}> Hangar </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                     
                                        style={[styles.button]}
                                       
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
        backgroundColor:'darkcyan',
        height:height,
        

    },
    title: {
        fontFamily: 'Nunito-Bold',
        color: 'darkorange',
        fontSize: 40,
        margin: 30,
        justifyContent: 'flex-start',

    },
    answerButtons: {
        justifyContent:'flex-end',
        marginTop:'auto',
        marginBottom:20,
        alignSelf:'center',
        
        width:width/1.1,
        height:height/3.2,
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    button: {
        backgroundColor:'darkorange',
        width:'45%',
        borderWidth:7,
        borderColor: "maroon",
        
        height:'45%',
        margin: 5,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText: {
        fontSize:20,
        fontFamily: 'Nunito-Regular',
        color: 'maroon',
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
    },
    aircraftView: {
        top: 0,
        width: width/2,
        height: width/2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    aircraftImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    mapButton: {
        width:70,
        height:50,
        backgroundColor:'darkorange',
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'flex-end',
        marginTop:20,
        marginRight:20
       
    },
    titleAndButton: {
        
        height:height/13,
    }
});
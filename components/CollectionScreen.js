import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ListView, TouchableHighlight, Image, FlatList } from 'react-native';
import { Font } from 'expo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const todos = [];

// const todos = [{    key:'1',
//                     name: 'air canada',
//                     image: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
//                     date_collected: '2018-11-20',
//                     location: 'here'

//                  },
//                  {  key:'2',
//                     name: 'DELTA',
//                     image: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
//                     date_collected: '2018-11-20',
//                     location: 'here'

//                  },
//                  {  key:'3',
//                     name: 'not air canada',
//                     image: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',
//                     date_collected: '2018-11-20',
//                     location: 'here'

//                  }
//               ];

export default class CollectionScreen extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            todoDataSource: ds.cloneWithRows(userInfo.collections),
            size: true,
            modalVisible: false,
            poppedImage: '',
            fontLoaded: false,
            todos: userInfo.collections
        }
        this.pressRow = this.pressRow.bind(this);
        this.renderRow = this.renderRow.bind(this);

    }

    async componentDidMount() {
        await Font.loadAsync({

            'BebasNeueBold': require('../assets/fonts/BebasNeueBold.otf'),
            'BebasNeue-Regular': require('../assets/fonts/BebasNeueRegular.otf'),
            'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
            'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
        this.fetchTodos();
        const { navigation } = this.props;
        
        const image = navigation.getParam('image', 'noimage');

        if (image != 'noimage'){
            const name = navigation.getParam('name', 'no name');
            const date = navigation.getParam('date_collected', 'no date');
            const location = navigation.getParam('location', 'no location');
            this.state.todos.push({name: name, image:image, date_collected: date, location: location, key: JSON.stringify(todos.length + 1)})
        }
    }

    pressRow(rowID) {
        console.log('Row# ' + rowID);
    }

    fetchTodos() {   
        this.setState({
            todoDataSource: this.state.todoDataSource.cloneWithRows(this.state.todos)
        });
    }

    renderRow(task) {
        return (

            <View>
            <Text>{task.name}</Text>
                <View style={styles.line}></View>
                    <TouchableHighlight 
                        onPress={() => {
                        this.pressRow(task.name);
                    }}>
                    <View style={styles.row}>
                        <Image style={styles.small} source={{uri: task.image}}/>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    static navigationOptions = {
        title: 'Collection',
        headerStyle: {
            backgroundColor: '#625E5E'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {
       return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                <Image style={{position:'absolute', right:-60,height:'100%',opacity:0.6, backgroundColor: '#E2E2E2'}} 
                    source={require('../assets/background.png')} 
                    resizeMode="cover"
                />
            {
                userInfo.collections == "null" &&
                <Text>You have nothing in your collection</Text>

            }
            {
                userInfo.collections != "null" && this.state.fontLoaded ? (
                <View style={styles.container}>

                    <View style={{alignSelf:'center'}}>
                    <View style={styles.titleAndButton}>
                    <TouchableHighlight
                        style={styles.mapButton}
                        onPress={()=>{this.props.navigation.navigate('Map')}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Map</Text> 
                    </TouchableHighlight>
                    <Text style={styles.text}>Hangar</Text>
                    </View>
                    <FlatList
                        data = {this.state.todos}
                        
                        renderItem = {({item}) => 
                        <TouchableHighlight onPress={() => {
                              this.pressRow(item.key);
                              this.props.navigation.navigate('Plane', {
                                name: item.name,
                                image: item.image,
                                date_collected: item.date_collected,
                                location: item.location
                            })
                              
                            }}>
                        <View style={styles.row}>
                            <Image style={styles.image} source={{uri: item.image}} />
                            <View style={styles.textContainer}>
                                <Text style={styles.planeTitle}>{item.name}</Text>
                                <Text style={styles.found}>Found on: {item.date_collected}</Text>
                            </View>
                        </View>
                  </TouchableHighlight>}
                    />
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
        height: height,
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'Nunito-Bold',
        color: 'white',
        fontSize: 40,
        margin: 30,
        justifyContent: 'flex-start',
        alignSelf:'center',
        backgroundColor:'transparent',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    row: {
        flex:1,
        flexDirection:'row',
        width:width/1.2,
        backgroundColor:'white',
        borderRadius:50,
        height:70,
        margin: 10,
    },
    textContainer: {
        flexDirection:'column',
    },
    image: {
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'flex-start',
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:'#E2E2E2',
        marginLeft: 10,
        marginTop:8
    },
    planeTitle: {
        marginTop:7,
        marginLeft:7,
        flexDirection:'column',
        fontSize:22,
        fontFamily:'Nunito-Bold',
        justifyContent:'flex-start',
        alignSelf:'flex-start',
        color:'#625E5E'
    },
    found: {
        marginLeft:7,
        fontFamily:'Nunito-Regular',
        color:'#625E5E',
        alignSelf:'flex-start'
    },
    mapButton: {
        width:70,
        height:50,
        borderWidth:7,
        borderColor: "white",
        borderRadius:50,
        backgroundColor:'#FF8C00',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-start',
        margin: 20,
    },
    titleAndButton: {
        flexDirection:'row'
    }
});

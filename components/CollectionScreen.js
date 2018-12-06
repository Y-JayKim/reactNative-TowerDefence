import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ListView, TouchableHighlight, Image, FlatList } from 'react-native';
import { Font } from 'expo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const todos = [];


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
        // const { navigation } = this.props;
        
        // const image = navigation.getParam('image', 'noimage');

        // if (image != 'noimage'){
        //     const name = navigation.getParam('name', 'no name');
        //     const date = navigation.getParam('date_collected', 'no date');
        //     const location = navigation.getParam('location', 'no location');
        //     this.state.todos.push({name: name, image:image, date_collected: date, location: location, key: JSON.stringify(todos.length + 1)})
        // }
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

    static navigationOptions = { header: null }

    render() {

        console.log(userInfo.collections);
        return (
            <View style={{flex: 1, backgroundColor: 'darkcyan', alignItems: 'center'}}>
                

            {
                userInfo.collections == "null" &&
                <View style={{top:100, width:300,padding:10, height:200, borderWidth:1, borderColor:'black', borderRadius:20,alignItems: 'center',justifyContent: 'center',backgroundColor:'#625E5E'}}>
                    <Text style={{fontSize:30, color:'white'}}>You have no collected planes yet!</Text>
                    <TouchableHighlight
                        style={{width:100,height:50, borderWidth:1, borderColor:'black',borderRadius:10, backgroundColor:'black', marginTop:30,alignItems: 'center',justifyContent: 'center'}}
                        onPress={()=>this.props.navigation.navigate('Map')}>
                            <Text style={{fontSize:20, color:'white'}}>Go back</Text>
                    </TouchableHighlight>
                </View>

            }
            {
                userInfo.collections != "null" && this.state.fontLoaded ? (
                <View style={styles.container}>

                    <View style={{alignSelf:'center'}}>
                    <TouchableHighlight
                                style={styles.mapButton}
                                onPress={()=>{this.props.navigation.navigate('Map')}}>
                                <Text style={{fontSize:20, color:'maroon',fontFamily: 'Nunito-Bold',}}>Map</Text> 
                            </TouchableHighlight>
                        <View style={styles.titleAndButton}>
                            
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
                                location: item.location,
                                icao:item.icao
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
        backgroundColor: 'darkcyan',
        height: height,
        flexDirection:'column',
    },
    text: {
        fontFamily: 'Nunito-Bold',
        color: 'darkorange',
        fontSize: 50,
        margin: 30,
        justifyContent: 'flex-start',
        alignSelf:'center',
        textAlign:'center'
        
    },
    row: {
        flex:1,
        flexDirection:'row',
        width:width/1.2,
        backgroundColor:'darkorange',
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
        color:'maroon'
    },
    found: {
        marginLeft:7,
        fontFamily:'Nunito-Regular',
        color:'maroon',
        alignSelf:'flex-start'
    },
    mapButton: {
        width:70,
        height:50,
        backgroundColor:'darkorange',
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'flex-end',
        marginTop:40,
        marginRight:20
       
    },
    titleAndButton: {
        flexDirection:'row',
        height:height/13,
        justifyContent:'center',
        
    }
});

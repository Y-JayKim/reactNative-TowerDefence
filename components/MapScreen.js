import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight, Button } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Permissions from 'react-native-permissions';

import FlightsComponent from './FlightsComponent';

export default class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationPermission: 'unknown',
            region: {
                latitude: 49.1966913,
                latitudeDelta: 0.48, // approx 0.18 deg = 20 km, increase this for testing if no flights are within range
                longitude: -123.183701,
                longitudeDelta: 0.48,
            },
            markerRegion: {
                latitude: 49.1966913,
                latitudeDelta: 0.48, // approx 0.18 deg = 20 km, increase this for testing if no flights are within range
                longitude: -123.183701,
                longitudeDelta: 0.48,
            }
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    static navigationOptions = {

        headerStyle: {
            backgroundColor:'grey'
        },
        headerTintColor: '#fff',
        
        headerLeft: (
      <Button
        onPress={() => {this.props.navigation.navigate('Home')}}
        title="Log Out"
        
      />),
      headerRight: (
      <Button
        onPress={() => {this.props.navigation.navigate('Collection')}}
        title="Hangar"
        
      />)
    };

    componentDidMount() {
        this._requestPermission();
        navigator.geolocation.getCurrentPosition((position) => {
            let newRegion = Object.assign({}, this.state.region);
            newRegion.latitude = position.coords.latitude;
            newRegion.longitude = position.coords.longitude;
            this.setState({
                region: newRegion,
                markerRegion: newRegion
            });
        },
            (error) => console.log(error));
    }

    _requestPermission() {
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
            });
    }

    onRegionChange(region){
        this.setState({ region });
    }

    render() {
        return (

            <MapView
                region={this.state.region}
                // onRegionChange={this.onRegionChange}
                style={styles.map}
            >
                <Marker
                    coordinate={{latitude: this.state.markerRegion.latitude, longitude: this.state.markerRegion.longitude}}
                />
                <FlightsComponent
                    region={this.state.region}
                    props1={this.props}
                />
                
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
})
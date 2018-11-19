import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Permissions from 'react-native-permissions';

import FlightsComponent from './FlightsComponent';

export default class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationPermission: 'unknown',
            region: {
                latitude: 50.60254331180157,
                latitudeDelta: 0.18, // approx 0.18 deg = 20 km, increase this for testing if no flights are within range
                longitude: 16.721875704824924,
                longitudeDelta: 0.18,
            },
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    static navigationOptions = {
        title: 'Map',
        headerStyle: {
            backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    componentDidMount() {
        this._requestPermission();
        navigator.geolocation.getCurrentPosition((position) => {
            let newRegion = Object.assign({}, this.state.region);
            newRegion.latitude = position.coords.latitude;
            newRegion.longitude = position.coords.longitude;
            this.setState({
                region: newRegion,
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
        this.setState({
            region
        });
    }

    render() {
        return (
            <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                style={styles.map}
            >
                <Marker
                    coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                />
                <FlightsComponent region={this.state.region}/>
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
})
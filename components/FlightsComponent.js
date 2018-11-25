import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import { Marker } from 'react-native-maps';

export default class FlightsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flights: null,
        };
    }

    componentDidMount() {
        this.fetchFlights();
    }

    componentDidUpdate(prevProps) {
        if (this.props.region != prevProps.region)
            this.fetchFlights();
    }

    fetchFlights() {
        let lamin = this.props.region.latitude - this.props.region.latitudeDelta / 2;
        let lomin = this.props.region.longitude - this.props.region.longitudeDelta / 2;
        let lamax = this.props.region.latitude + this.props.region.latitudeDelta / 2;
        let lomax = this.props.region.longitude + this.props.region.longitudeDelta / 2;
        fetch('https://opensky-network.org/api/states/all?lamin='+lamin+'&lomin='+lomin+'&lamax='+lamax+'&lomax='+lomax)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                flights: response.states
            });
        })
    }

    render() {
        if (this.state.flights === null) 
            return (null);

        return this.state.flights.map((flight) => {
            return (
                <Marker
                    // onPress={(flight)=>console.log(flight)}
                    coordinate={{latitude: flight[6], longitude: flight[5]}}
                    key={flight[0]}
                    image={require('../assets/plane.png')}
                />
            );
        })
    }
}

const styles = StyleSheet.create({
    
})
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';

import { Marker } from 'react-native-maps';

import AwesomeAlert from 'react-native-awesome-alerts';

export default class FlightsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flights: null,
            showAlert: false,
            quizAnswers:{'correct':[], 'wrong':[]}
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
        let lamin = this.props.region.latitude - this.props.region.latitudeDelta;
        let lomin = this.props.region.longitude - this.props.region.longitudeDelta;
        let lamax = this.props.region.latitude + this.props.region.latitudeDelta;
        let lomax = this.props.region.longitude + this.props.region.longitudeDelta;
        fetch('https://opensky-network.org/api/states/all?lamin='+lamin+'&lomin='+lomin+'&lamax='+lamax+'&lomax='+lomax)
        .then((response) => response.json())
        .then((response) => {
            let results = response.states;
            this.state.quizAnswers['correct'] = [];
            this.state.quizAnswers['wrong'] = [];
          
            if (results && results.length) {
                for (i = results.length - 1; i >= 0; i--) {
                    if (results[i][1].trim() === "")
                        results.splice(i, 1);
                }
                for (i = 0; i < results.length; i++){
                    console.log(results[i][1]);
                    this.state.quizAnswers['wrong'].push(results[i][1]);
                }
            }
          
            this.setState({
                flights: results,
            });
        })
    }

    render() {
        console.log(this.state.quizAnswers);

        if (this.state.flights === null) 
            return (null);

        return this.state.flights.map((flight) => {
            console.log(flight[0]);
            return (
                <Marker
                    coordinate={{latitude: flight[6], longitude: flight[5]}}
                    key={flight[0]}
                    image={require('../assets/plane.png')}
                    // onPress={()=>this.props.props1.navigation.navigate('QuizPrompt')}
                    onPress={()=>Alert.alert('Message','Do you want to collect this plane?',[
                        {text: 'Cancel', onPress:()=> console.log('Cancel button pressed')},
                        {text: 'Yes!', onPress: () => {
                            this.state.quizAnswers['correct'].push(flight[7])
                            console.log(this.state.quizAnswers)
                            this.props.props1.navigation.navigate('Quiz', {
                                callsign: flight[1],
                                lat:flight[6],
                                long: flight[5],
                                answers: this.state.quizAnswers,
                                icao: flight[0].trim()
                        })}
                        }
                        
                    ],{ cancelable: false })}
                />
            );
        })
    }
}
// this.props.navigation.navigate('Collection')
const styles = StyleSheet.create({
    
})
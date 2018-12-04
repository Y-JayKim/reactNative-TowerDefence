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
            this.state.quizAnswers['correct'] = []
            this.state.quizAnswers['wrong'] = []
            this.setState({
                flights: response.states,
            });

            var nonuni = [];

            for (i = 0; i < response.states.length; i++){
                console.log(response.states[i][7]);
                nonuni.push(response.states[i][7])
            }
            this.state.quizAnswers['wrong'] = [...new Set(nonuni)];
            console.log(this.state.quizAnswers);
        })
    }

    render() {
        console.log(this.state.quizAnswers);

        if (this.state.flights === null) 
            return (null);

        return this.state.flights.map((flight) => {
            
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
                                picture:''
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
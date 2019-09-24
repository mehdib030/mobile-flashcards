import React, { Component } from 'react'
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native'

export default class HomeScreen extends Component {


    render(){
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>This is the Home view</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                    <Text>Press here for the Dashboard</Text>
                </TouchableOpacity>
                </View>

        )
    }

}
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, TouchableOpacity, TextInput, Switch } from 'react-native';
import {} from './LogInPage'
import {} from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';

function SettingsPage({ navigation, route }) {

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30, textAlign: 'center', paddingBottom: 5, paddingTop: 5}}>Settings</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.subheader}>General Settings</Text>
                <View style={styles.setting}>
                    <Divider />
                    <Text style={styles.text}>Push Notifications</Text>
                    <Text style={styles.discription}>Get sent push notifications to this device about deliveries, promotions, and more!</Text>
                    <Switch style={{paddingBottom: 5}} />
                </View>
                <View style={styles.setting}>
                    <Divider />
                    <Text style={styles.text}>Recive Emails</Text>
                    <Text style={styles.discription}>Get sent emails about deliveries, promotions, and more!</Text>
                    <Switch style={{paddingBottom: 5}} />
                </View>
                <Text style={styles.subheader}>Privacy Settings</Text>
                <View style={styles.setting}>
                    <Divider />
                    <Text style={styles.text}>Share Location</Text>
                    <Text style={styles.discription}>Share your location with a delivery person or a Make-e-Me Chef to ensure the accuracy of your order!</Text>
                    <Switch style={{paddingBottom: 5}}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        paddingBottom: 5,
        fontSize: 15,
        paddingTop: 10,
        color: 'black'
    },
    discription: {
        fontSize: 12,
        color: 'gray'
    },
    setting: {
        flex: 1,
        width: responsiveWidth(95),
        paddingBottom: 5,
        paddingTop: 5
    },
    subheader: {
        paddingBottom: 5,
        fontSize: 15,
        paddingTop: 10,
        color: 'black',
        textAlign: 'center'
    },
})

export default SettingsPage;
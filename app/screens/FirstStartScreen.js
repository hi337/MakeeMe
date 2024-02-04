import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import {} from '@react-navigation/native';
import {} from 'react-native-gesture-handler';

const FirstStartScreen = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.tittleView}>
                <Text style={{fontSize: 32}}>Welcome To Make-e-Me</Text>
                <Text style={{fontSize: 16, top: 5}}>The one stop shop for private chefs</Text>
            </View>
            <View style={styles.buttonsView}>
                <View style={styles.emiailButtonContainer}>
                    <TouchableOpacity style={styles.emailButtons} onPress={() => navigation.navigate('Log In Page')}>
                        <Text style={{color: 'white'}}>Log-In</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor: 'white', flex: 0.06}} />
                    <TouchableOpacity style={styles.emailButtons} onPress={() => navigation.navigate('Sign Up Page')}>
                        <Text style={{color: 'white'}}>Sign-Up</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.googleLogInButton}>
                    <Text style={{color: 'white'}}>Sign-In With Google</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonsView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.25,
    },
    googleLogInButton: {
        width: 338,
        height: 53,
        backgroundColor: 'blue',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emiailButtonContainer: {
        width: 338,
        height: 66,
        backgroundColor: 'blue',
        alignSelf: 'flex-start',
        bottom: 16,
        flexDirection: 'row'
    },
    tittleView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0.8,
        top: 20
    },
    emailButtons: {
        backgroundColor: 'blue',
        flex: 0.47,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default FirstStartScreen;
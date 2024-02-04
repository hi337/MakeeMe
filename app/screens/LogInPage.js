// This Page is useless and is just here for remembrance sake. The Real Login Page can be found in app.js
// Until I find a better way to link the pages, it works for the time being.


import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, TouchableOpacity, TextInput } from 'react-native';
import {} from "@react-navigation/native";
import {} from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInPage = ({ navigation, route }) => {

    //useStates
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const LogInOnPress = async() => {
        fetch('http://192.168.1.77:5000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((resp) => {
            if (resp.status === 401) {
                alert("failed")
            } else if (resp.status === 200) {
                alert("it worked")
                return resp.json()
            }
        })
        .then(async (json) => {
            try {
                await AsyncStorage.setItem('token', json.token)
            } catch (e) {
                alert(e)
            }
        })
        .catch(err => alert(err))
    }

    return (
        <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
        }}>
            <Text style={{fontSize: 32, position: 'absolute', top: 10}}>Log-In</Text>
            <View>
                <TextInput style={{
                    paddingLeft: 20,
                    borderRadius: 10,
                    height: 50,
                    fontSize: 25,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    marginBottom: 20,
                    color: 'green',
                    width: 350,
                }}
                placeholder='Email'
                returnKeyType='next'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
                value={email}>
                </TextInput>
                <TextInput style={{
                    paddingLeft: 20,
                    borderRadius: 10,
                    height: 50,
                    fontSize: 25,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    marginBottom: 20,
                    color: 'green',
                    width: 350,
                }}
                placeholder='Password'
                returnKeyType='go'
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}>
                </TextInput>
                <TouchableOpacity style={{
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: 'blue', 
                    paddingVertical: 10,
                    justifyContent: 'center'
                }} onPress={() => LogInOnPress()}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 20
                    }}>Log-In</Text>
                </TouchableOpacity>
                <Text style={{color: '#1abc9c', textAlign: 'center', top: 5}} onPress={() => navigation.navigate('Sign Up Page')}>Don't Have An Account? Sign-Up Here!</Text>
            </View>
        </SafeAreaView>
    );
};



export default LogInPage;
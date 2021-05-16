import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {} from './LogInPage'
import {} from "@react-navigation/native";
import {} from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

const SignUpPage = ({ navigation, route }) => {

    //useStates
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    //radiobutton useState
    const [checked, setChecked] = useState('user');

    function onSignUpPress() {

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
        } else {
            fetch("http://192.168.1.74:5000/user/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fullName: fullName,
                    address: address,
                    phone: phone,
                    accountType: checked
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                if (res.status === 201) {
                    alert("signup successful!")
                    navigation.navigate("Log In Page")
                } else if (res.status === 422) {
                    alert("account with this information already exists")
                } else if (res.status === 201) {
                    alert("error, please try again")
                } else if (res.status === 500) {
                    alert("password failed, try again")
                }
            })
            .catch(err => {
                alert(err)
            })
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
            <Text style={{fontSize: 32, alignSelf: 'center', paddingTop: 10, paddingBottom: 10}}>Sign-Up</Text>
            <View style={styles.textInputView}>
                <TextInput style={styles.input}
                placeholder='Full Name'
                returnKeyType='next'
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setFullName(text)}
                value={fullName}>
                </TextInput>
                <TextInput style={styles.input}
                placeholder='Address'
                returnKeyType='next'
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setAddress(text)}
                value={address}>
                </TextInput>
                <TextInput style={styles.input}
                placeholder='Phone Number'
                returnKeyType='next'
                keyboardType='phone-pad'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setPhone(text)}
                value={phone}>
                </TextInput>
                <TextInput style={styles.input}
                placeholder='Email'
                returnKeyType='next'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
                value={email}>
                </TextInput>
                <TextInput style={styles.input}
                placeholder='Password'
                returnKeyType='next'
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}>
                </TextInput>
                <TextInput style={styles.input}
                placeholder='Confirm Password'
                returnKeyType='go'
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}>
                </TextInput>
                <View style={{paddingLeft: 10, paddingBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton
                            value="user"
                            status={ checked === 'user' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('user')}
                        />
                        <Text style={{fontSize: 25}}>Make a User Account</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton
                            value="chef"
                            status={ checked === 'chef' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('chef')}
                        />
                        <Text style={{fontSize: 25}}>Make a Chef Account</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => onSignUpPress()}>
                    <Text style={styles.buttonText}>Sign-Up</Text>
                </TouchableOpacity>
                <Text style={{color: '#1abc9c', textAlign: 'center', top: 5, paddingBottom: 10}} onPress={() => navigation.navigate('Log In Page')}>Already Have An Account? Log-In Here!</Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        paddingLeft: 20,
        borderRadius: 10,
        height: 50,
        fontSize: 25,
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        color: 'green',
        width: 350,
    },
    buttonContainer: {
        height: 50,
        borderRadius: 50,
        backgroundColor: 'blue', 
        paddingVertical: 10,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
});

export default SignUpPage;
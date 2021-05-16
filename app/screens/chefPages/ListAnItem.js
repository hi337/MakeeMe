import React, {useState} from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import { TextInput as TextInputNative } from 'react-native';
import { Button, Image, Divider } from 'react-native-elements';
import { TextInput, RadioButton } from 'react-native-paper';
import { } from 'react-native-gesture-handler';
import {  } from '@react-navigation/native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from'@react-native-async-storage/async-storage'

export default function ListAnItem({navigation, route}) {

    //camera route params
    if (route.params) {
        var {uri} = route.params;
    } else {
        var uri = null
    }

    //useStates
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('0')
    const [ delivery, setDelivery ] = useState('0')
    const [ checked, setChecked ] = useState('paypal');

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 5, paddingBottom: 20}}>List An Item</Text>
                <View style={styles.photo}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>Photo</Text>
                    <Button type={'solid'} buttonStyle={{backgroundColor: 'blue', width: responsiveWidth(90), borderRadius: 10}} onPress={() => navigation.navigate('Camera Page', {from: "List An Item"})} title={'Take a Picture'} />
                    <View style={{paddingBottom: 10}} />
                    <Image style={{height: 150, width: 150, borderRadius: 10, borderWidth: 0.5}} source={{uri: uri}} />
                </View>
                <View style={styles.titleView}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>Title</Text>
                    <TextInput maxLength={60} mode={'outlined'} label="Title Here..." value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.descriptionView}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>description</Text>
                    <TextInputNative numberOfLines={3} style={styles.description} multiline={true} placeholder="description Here..." value={description} onChangeText={text => setDescription(text)} />
                </View>
                <View style={styles.priceView}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 1}}>Price</Text>
                    <Text style={{color: 'gray'}}>(In Canadian Dollars)</Text>
                    <TextInputNative style={{borderBottomWidth: 1, width: 55, height: 50, fontSize: 20, textAlign: 'center'}} maxLength={4} keyboardType={'numeric'} numberOfLines={3} value={price} onChangeText={text => setPrice(text)} />
                </View>
                <View style={styles.priceView}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 1}}>Delivery</Text>
                    <Text style={{color: 'gray'}}>(In Canadian Dollars)</Text>
                    <TextInputNative style={{borderBottomWidth: 1, width: 55, height: 50, fontSize: 20, textAlign: 'center'}} maxLength={4} keyboardType={'numeric'} numberOfLines={3} value={delivery} onChangeText={text => setDelivery(text)} />
                </View>
                <View style={styles.prefrenceView}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 1}}>Payment Methods</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <RadioButton
                            value="paypal"
                            status={ checked === 'paypal' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('paypal')}
                        />
                        <Text style={{fontSize: 25}}>PayPal</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <RadioButton
                            value="google pay"
                            status={ checked === 'google pay' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('google pay')}
                        />
                        <Text style={{fontSize: 25}}>Google Pay</Text>
                    </View>
                    <View style={{paddingTop: 25}}>
                        <Button type={'solid'} buttonStyle={{backgroundColor: 'blue', width: responsiveWidth(90), borderRadius: 10}} title={'List Your Item'} onPress={async () => {
                            let formData = new FormData()
                            formData.append('name', title)
                            formData.append('price', price)
                            formData.append('delivery', delivery)
                            formData.append('description', description)
                            formData.append('productImage', { uri: uri, name: Date.now() + uri, type: 'image/jpeg'})
                            fetch('http://192.168.1.74:5000/products',{
                                method: 'POST',
                                headers: {
                                    'Authorization': 'bearer '+ await AsyncStorage.getItem("userToken")
                                },
                                body: formData
                            })
                            .then(resp => console.log(resp))
                            .catch(err => console.log(err))
                        }}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    titleView: {
        flex: 1,
        paddingTop: 15,
    },
    photo: {
        flex: 1,
        alignItems: 'center'
    },
    descriptionView: {
        flex: 1,
        paddingTop: 10,
    },
    description: {
        paddingLeft: 20,
        borderRadius: 10,
        height: 100,
        fontSize: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        color: 'green',
        width: 350,
        alignSelf: 'center'
    },
    priceView: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 5
    },
    prefrenceView: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
})
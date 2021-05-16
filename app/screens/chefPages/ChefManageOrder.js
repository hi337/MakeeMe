import React from "react";
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import { Image, Divider } from 'react-native-elements';
import { Button } from 'react-native-paper';
import "react-native-gesture-handler";
import { } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default function ChefManageOrder({navigation, route}) {

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 5, paddingBottom: 20}}>Item</Text>
                <Image style={{width: responsiveWidth(100), height: 200, borderRadius: 10}} source={{uri: "https://reactjs.org/logo-og.png"}} />
                <View style={styles.itemText}>
                    <Text numberOfLines={1} style={{fontSize: 29}}>Product Name</Text>
                    <Text numberOfLines={1} style={{fontSize: 24}}>C $100 <Text style={{fontSize: 16, color: 'gray'}}>+ Delivery Fee $3</Text></Text>
                    <Text numberOfLines={2} style={{color: 'gray'}}>Description</Text>
                </View>
                <View style={styles.userDiscription}>
                    <Divider style={{height: 3, backgroundColor: '#DFE2E6'}} />
                    <Text style={{paddingTop: 5, color: 'black'}}>Name: John Doe</Text>
                    <Text style={{paddingTop: 5, color: 'black'}}>Address: 120 Ball Cove SW</Text>
                    <Text style={{paddingTop: 5, color: 'black'}}>City: Edmonton, Alberta</Text>
                    <Text style={{paddingTop: 5, color: 'black'}}>Phone: 7807341234</Text>
                    <Text style={{paddingTop: 5, color: 'black', paddingBottom: 5}}>Email: haha@gmail.com</Text>
                    <Divider style={{height: 3, backgroundColor: '#DFE2E6'}} />
                </View>
                <View style={styles.buttonsView}>
                    <Button onPress={() => alert("z")} style={{flex: 1, backgroundColor: 'blue', borderRadius: 20, width: responsiveWidth(96), alignSelf: 'center'}} mode={'contained'}>Accept Order</Button>
                    <View style={{paddingTop: 10}}></View>
                    <Button onPress={() => alert("Order Caneled")} style={{backgroundColor: 'blue', flex: 1, borderRadius: 20, width: responsiveWidth(96), alignSelf: 'center'}}  mode={'contained'}>Contact Customer</Button>
                    <View style={{paddingTop: 10}}></View>
                    <Button onPress={() => alert("Order Caneled")} style={{flex: 1, borderRadius: 20, width: responsiveWidth(96), alignSelf: 'center'}}  mode={'outlined'}>Cancel Order</Button>
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
        backgroundColor: "white"
    },
    itemText: {
        flex: 1,
        padding: 10
    },
    buttonsView: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    userDiscription: {
        flex: 1,
        paddingLeft: 10
    },
})
import React, {useState, useEffect, useCallback} from "react";
import { SafeAreaView, Text, StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import { Image, } from 'react-native-elements';
import { Button } from 'react-native-paper';
import "react-native-gesture-handler";
import { } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ChefItemPage({navigation, route}) {

    const [uri, setUri] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [delivery, setDelivery] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    const productId = route.params.productId

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        async function fetchData() {
        fetch("http://192.168.1.74:5000/products/"+productId, {
            method: "GET",
            headers: {
                'Authorization': 'bearer '+ await AsyncStorage.getItem("userToken")
            },
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res.error)
                return console.log('failed query')
            }
        })
        .then((json) => {
            setName(json.product.name)
            setPrice(json.product.price)
            setUri(json.product.productImage)
            setDescription(json.product.description)
            setDelivery(json.product.delivery)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(setRefreshing(false))
        }
        fetchData()
    })

    useEffect(() => {
        async function fetchData() {
        fetch("http://192.168.1.74:5000/products/"+productId, {
            method: "GET",
            headers: {
                'Authorization': 'bearer '+ await AsyncStorage.getItem("userToken")
            },
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res.error)
                return console.log('failed query')
            }
        })
        .then((json) => {
            setName(json.product.name)
            setPrice(json.product.price)
            setUri(json.product.productImage)
            setDescription(json.product.description)
            setDelivery(json.product.delivery)
        })
        .catch(err => {
            console.log(err)
        })}
        fetchData()
    }, [])

    async function endListing() {
        fetch("http://192.168.1.74:5000/products/"+productId, {
            method: "DELETE",
            headers: {
                'Authorization': 'bearer '+ await AsyncStorage.getItem("userToken")
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.deletedProduct) {
                alert("successful")
                navigation.navigate("Chef Home")
            } else {
                alert("failed")
            }
        })
        .catch(err => alert(err))
    }


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 5, paddingBottom: 20}}>Item</Text>
                <Image style={{width: responsiveWidth(100), height: 200, borderRadius: 10}} source={{uri: "http://192.168.1.74:5000/"+uri.toString()}} />
                <View style={styles.itemText}>
                    <Text numberOfLines={1} style={{fontSize: 29}}>{name}</Text>
                    <Text numberOfLines={1} style={{fontSize: 24}}>C ${price} <Text style={{fontSize: 16, color: 'gray'}}>+ Delivery Fee ${delivery}</Text></Text>
                    <Text numberOfLines={2} style={{color: 'gray'}}>{description}</Text>
                </View>
                <View style={styles.buttonsView}>
                    <Button onPress={() => navigation.navigate("Edit An Item", {productId: productId, from: "Chef Item Page"})} style={{flex: 1, backgroundColor: 'blue', borderRadius: 20, width: responsiveWidth(96), alignSelf: 'center'}} mode={'contained'}>Edit Listing</Button>
                    <View style={{paddingTop: 10}}></View>
                    <Button onPress={() => endListing()} style={{flex: 1, borderRadius: 20, width: responsiveWidth(96), alignSelf: 'center'}}  mode={'outlined'}>End Listing</Button>
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
})
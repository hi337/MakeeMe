import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import {} from "@react-navigation/native";
import { } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';

function HomePage({ navigation, route }) {

    // useStates
    const [ isLoading, setLoading ] = useState(true)
    const [ data, setData ] = useState()
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetch("http://192.168.1.74:5000/products", {method: 'GET'})
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                return console.log('failed query')
            }
        })
        .then((json) => setData(json.products))
        .catch(err => {
            console.log(err)
        })
        .finally(setRefreshing(false))
    })

    useEffect(() => {
    fetch("http://192.168.1.74:5000/products", {method: 'GET'})
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        } else {
            return console.log('failed query')
        }
    })
    .then((json) => setData(json.products))
    .catch(err => {
        console.log(err)
    })
    .finally(setLoading(false))
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            {isLoading ? <ActivityIndicator size='large' color='#0000ff'/> : 
            <FlatList showsVerticalScrollIndicator={false} data={data}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={<>
                <Text style={{fontSize: 30, textAlign: 'center', paddingBottom: 1, paddingTop: 5}}>Home</Text>
                <Divider style={{height: 4, width: responsiveWidth(30), backgroundColor: '#DFE2E6', alignSelf: 'center'}} />
            </>}
            renderItem={({item}) => <View style={styles.itemcard}>
            <TouchableOpacity style={styles.itemcard} onPress={() => navigation.navigate("Item Page", {productId: item._id})} >
              <Image style={{width: 350, height: 170, borderRadius: 10}} source={{uri: "http://192.168.1.74:5000/"+item.productImage}} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={{fontSize: 15}}>${item.price}</Text>
            </TouchableOpacity>
          </View>}
          keyExtractor={(item, index) => index.toString()} 
          />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    itemcard: {
        paddingTop: 10,
        paddingBottom: 3
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold'
    },
})

export default HomePage;
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import {  } from 'react-native-gesture-handler';
import { Divider, Button } from 'react-native-elements';
import {  } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { cartItems } from '../Json/cartItems.json';
import { FAB } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CartScreen({navigation, route}) {

    //summaryValues
    let subtotal = 0
    cartItems.map((x) => {
        let price = x.price
        subtotal = subtotal + price
    })
    let fee = 0.60
    let delivery = 5.00
    let total = subtotal + fee + delivery 

    return(
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.flatlist} showsVerticalScrollIndicator={false} data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
                <>
                    <View style={styles.header}>
                        <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 5, paddingBottom: 20}}>Cart</Text>
                    </View>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>Items</Text>
                </>
            }
            renderItem={({item}) => <View>
                <View style={styles.item} >
                    <Text style={styles.amount}>{item.amount}x</Text>
                    <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <Divider style={{height: 3, backgroundColor: '#DFE2E6'}} />
            </View>} 
            ListFooterComponent={() =>
                <View style={{paddingBottom: 65}}>
                    <Button icon={() => <Ionicons name={'add'} size={20} color={'white'} />} onPress={() => navigation.navigate('Chef Profile Screen')} titleStyle={{fontSize: 13.5}} containerStyle={{paddingTop: 10, paddingRight: 5}} buttonStyle={{backgroundColor: 'blue', borderRadius: 20, width: responsiveWidth(35), alignSelf: 'flex-end'}} title="Add More Items" type={'solid'} />
                    <View style={styles.summaryContainer}>
                        <Divider style={{ height: 10, backgroundColor: '#DFE2E6'}} />
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10}}>Summary</Text>
                        <View style={styles.summaryItem} >
                            <Text style={styles.summaryName}>Subtotal</Text>
                            <Text style={styles.price}>${subtotal}</Text>
                        </View>
                        <View style={styles.summaryItem} >
                            <Text style={styles.summaryName}>Fee</Text>
                            <Text style={styles.price}>${fee}</Text>
                        </View>
                        <View style={styles.summaryItem} >
                            <Text style={styles.summaryName}>Delivery</Text>
                            <Text style={styles.price}>${delivery}</Text>
                        </View>
                        <View style={styles.summaryItem} >
                            <Text style={styles.summaryName}>Total</Text>
                            <Text style={styles.price}>${total}</Text>
                        </View>
                    </View>
                </View>
            }/>
            <FAB icon={() => <Ionicons name='cart' size={23} color={'white'} />} onPress={() => navigation.navigate('Checkout Page', {total: total})} style={{backgroundColor: 'blue', borderRadius: 10, width: responsiveWidth(90), position: 'absolute', margin: 16, right: 0, bottom: 0}} label={"Continue  $" + total} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    itemsView: {
        flex: 1,
    },
    item: {
        flex: 1,
        width: responsiveWidth(100),
        flexDirection: 'row',
        paddingBottom: 8,
        paddingTop: 8
    },
    amount: {
        textAlign: 'left',
        left: 5,
        fontSize: 20,
        flex: 1
    },
    name: {
        textAlign: 'center',
        fontSize: 18,
        flex: 1,
    },
    price: {
        textAlign: 'right',
        flex: 1,
        right: 5,
        fontSize: 16
    },
    summaryContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 10
    },
    summaryName: {
        textAlign: 'left',
        fontSize: 18,
        flex: 1,
        paddingLeft: 5
    },
    summaryItem: {
        flex: 1,
        width: responsiveWidth(100),
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5
    }
})
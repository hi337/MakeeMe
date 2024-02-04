import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Divider, Button } from 'react-native-elements';
import {} from "@react-navigation/native";
import {} from 'react-native-gesture-handler';
import { user } from '../Json/user.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';


function CheckoutPage({navigation, route}) {

    const { total } = route.params;
    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 5, paddingBottom: 20}}>Checkout Page</Text>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>Delivery Info</Text>
                <Divider />
                <Divider />
                <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('Address')}>
                    <Text style={styles.text}>Address</Text>
                    <Text numberOfLines={2} style={styles.value}>{user.address || "None"} </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('Phone Number')}>
                    <Text style={styles.text}>Phone Number</Text>
                    <Text numberOfLines={2} style={styles.value}>{user.phoneNumber || "None"}</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('Payment')}>
                    <Text style={styles.text}>Payment</Text>
                    <Text numberOfLines={2} style={styles.value}>{user.paymentMethods.map((x) => {
                        if (x.methodchosen === true) {
                            return x.Name
                        } else {
                            return null
                        }
                    })}</Text>
                </TouchableOpacity>
                <Divider />
                <View style={{paddingTop: 15}}>
                    <FAB onPress={() => alert("Payment Worked")} style={{backgroundColor: 'blue', borderRadius: 10, width: responsiveWidth(90), alignSelf: 'center'}} label={"Checkout  $" + total} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    setting: {
        flex: 1,
        width: responsiveWidth(95),
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
    },
    text: {
        paddingBottom: 5,
        fontSize: 17,
        paddingTop: 10,
        color: 'black'
    },
    discription: {
        fontSize: 12,
        color: 'gray'
    },
    value: {
        paddingBottom: 5,
        fontSize: 17,
        paddingTop: 10,
        color: 'black',
        flex: 1,
        textAlign: "right"
    },
})

export default CheckoutPage;
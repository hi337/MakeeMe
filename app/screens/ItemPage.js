import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {} from 'react-native-gesture-handler';
import {Divider, Image, Button, Avatar, Icon} from 'react-native-elements';
import {} from '@react-navigation/native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ItemPage({navigation, route}) {
  //useStates
  const [amount, setAmount] = useState(1);
  const [uri, setUri] = useState();
  const [itemname, setItemname] = useState('');
  const [itemcost, setItemcost] = useState('');
  const [itemdelivery, setItemdelivery] = useState('');
  const [itemdescription, setItemdescription] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  // route Params
  const productId = route.params.productId;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch('http://192.168.1.73:5000/products/' + productId, {method: 'GET'})
      .then(resp => resp.json())
      .then(res => {
        setUri(res.product.productImage);
        setItemname(res.product.name);
        setItemcost(res.product.price);
        setItemdelivery(res.product.delivery);
        setItemdescription(res.product.description);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(setRefreshing(false));
  });

  // useEffect
  useEffect(() => {
    fetch('http://192.168.1.73:5000/products/' + productId, {method: 'GET'})
      .then(resp => resp.json())
      .then(res => {
        setUri(res.product.productImage);
        setItemname(res.product.name);
        setItemcost(res.product.price);
        setItemdelivery(res.product.delivery);
        setItemdescription(res.product.description);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // submitOrder
  async function submitOrder() {
    fetch('http://192.168.1.73:5000/orders/', {
      method: 'POST',
      headers: {
        Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
        quantity: amount,
      }),
    })
      .then(res => {
        console.log(productId);
        if (res.status === 201) {
          alert('it worked');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image
          source={{uri: 'http://192.168.1.73:5000/' + uri}}
          style={styles.itemimage}
        />
        <Text style={styles.itemname}>{itemname}</Text>
        <Text
          style={{
            fontSize: 15,
            color: 'gray',
            paddingLeft: 10,
            paddingBottom: 10,
            paddingRight: 10,
          }}>
          {itemdescription}
        </Text>
        <Divider style={{height: 10, backgroundColor: '#DFE2E6'}} />
        <View style={styles.amountbuttons}>
          <TouchableOpacity
            style={{right: 7}}
            onPress={() => setAmount(amount + 1)}>
            <Text style={{fontSize: 35}}>+</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 40}}>{amount}</Text>
          <TouchableOpacity
            style={{left: 7}}
            onPress={() => setAmount(amount > 1 ? amount - 1 : amount)}>
            <Text style={{fontSize: 35}}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addToCart}>
          <Button
            title={
              'Order Total $' +
              String(Number(itemcost) * Number(amount) + Number(itemdelivery))
            }
            type="outline"
            onPress={() => submitOrder()}
          />
          <Button
            title={'View Orders'}
            type="clear"
            onPress={() => navigation.navigate('User Orders')}
          />
        </View>
        <View style={{paddingTop: 10}}>
          <Divider
            style={{
              height: 4,
              width: responsiveWidth(60),
              backgroundColor: '#DFE2E6',
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{flex: 1, paddingTop: 20, paddingLeft: 7}}>
          <Text style={{fontSize: 25, paddingLeft: 10}}>About the chef</Text>
          <TouchableOpacity
            style={styles.chefView}
            onPress={() => navigation.navigate('Chef Profile Screen')}>
            <Avatar rounded source={{uri: uri}} size="large" />
            <View style={{flex: 0.9}}>
              <Text style={{fontSize: 20, paddingLeft: 10}}>ChefName</Text>
              <Text style={{fontSize: 15, paddingLeft: 10}}>*Stars*</Text>
            </View>
            <View style={{flex: 0.1, justifyContent: 'center'}}>
              <Icon style={{}} name="arrow-right" type={'font-awesome'} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: 'white',
  },
  itemimage: {
    height: 200,
    width: responsiveWidth(100),
  },
  itemname: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
  amountbuttons: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'center',
  },
  addToCart: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  },
  chefView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 7,
    paddingBottom: 10,
  },
});

export default ItemPage;

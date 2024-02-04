import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Image, Divider} from 'react-native-elements';
import {Button, Modal, Portal, Provider} from 'react-native-paper';
import 'react-native-gesture-handler';
import {} from '@react-navigation/native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserManageOrder({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [cost, setCost] = useState();
  const [delivery, setDelivery] = useState();
  const [quantity, setQuantity] = useState();
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(true);

  const orderId = route.params.orderId;
  console.log(orderId);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    async function fetchData() {
      fetch('http://192.168.1.73:5000/orders/' + orderId.toString(), {
        method: 'GET',
        headers: {
          Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setName(json.order.product.name);
          setCost(json.order.product.price);
          setDelivery(json.order.product.delivery);
          setQuantity(json.order.quantity);
          setImg(json.order.product.productImage);
        })
        .catch(err => {
          alert(err);
        })
        .finally(setLoading(false));
    }
    fetchData();
  }, []);

  function cancelOrder() {
    async function fetchData() {
      fetch('http://192.168.1.73:5000/orders/' + orderId, {
        method: 'DELETE',
        headers: {
          Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.deletedOrder) {
            alert('successful');
            navigation.navigate('Orders');
          } else {
            console.log('failed');
          }
        })
        .catch(err => alert(err));
    }
    fetchData();
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Provider>
          <ScrollView>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                paddingTop: 5,
                paddingBottom: 20,
              }}>
              Item
            </Text>
            <Image
              style={{
                width: responsiveWidth(100),
                height: 200,
                borderRadius: 10,
              }}
              source={{uri: 'http://192.168.1.73:5000/' + img.toString()}}
            />
            <View style={styles.itemText}>
              <Text numberOfLines={1} style={{fontSize: 29}}>
                {name}
              </Text>
              <Text numberOfLines={1} style={{fontSize: 24}}>
                C ${cost}{' '}
                <Text style={{fontSize: 16, color: 'gray'}}>
                  + Delivery Fee ${delivery}
                </Text>
              </Text>
              <Text numberOfLines={2} style={{color: 'gray'}}>
                Quantity: {quantity}
              </Text>
            </View>
            <View style={styles.buttonsView}>
              <View style={{paddingTop: 10}}></View>
              <Button
                onPress={() => alert('Order Caneled')}
                style={{
                  backgroundColor: 'blue',
                  flex: 1,
                  borderRadius: 20,
                  width: responsiveWidth(96),
                  alignSelf: 'center',
                }}
                mode={'contained'}>
                Contact Chef
              </Button>
              <View style={{paddingTop: 10}}></View>
              <Button
                onPress={() => showModal()}
                style={{
                  flex: 1,
                  borderRadius: 20,
                  width: responsiveWidth(96),
                  alignSelf: 'center',
                }}
                mode={'outlined'}>
                Cancel Order
              </Button>
            </View>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={{
                  backgroundColor: 'white',
                  padding: 20,
                  alignItems: 'center',
                }}>
                <Text style={{paddingBottom: 10}}>
                  Why Do You Wish To Cancel This Order?
                </Text>
                <TextInput
                  style={styles.description}
                  value={reason}
                  onChangeText={text => setReason(text)}
                />
                <Button
                  onPress={() => cancelOrder()}
                  style={{
                    backgroundColor: 'blue',
                    borderRadius: 20,
                    width: responsiveWidth(96),
                    alignSelf: 'center',
                  }}
                  mode={'contained'}>
                  Confirm Cancel
                </Button>
                <View style={{paddingTop: 10}}></View>
                <Button
                  onPress={() => hideModal()}
                  style={{
                    borderRadius: 20,
                    width: responsiveWidth(96),
                    alignSelf: 'center',
                  }}
                  mode={'outlined'}>
                  Remove Cancel
                </Button>
              </Modal>
            </Portal>
          </ScrollView>
        </Provider>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemText: {
    flex: 1,
    padding: 10,
  },
  buttonsView: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  userDiscription: {
    flex: 1,
    paddingLeft: 10,
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
    alignSelf: 'center',
  },
});

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import 'react-native-gesture-handler';
import '@react-navigation/native';
import {Divider, Image} from 'react-native-elements';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChefManageOrders({navigation, route}) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      fetch('http://192.168.1.73:5000/orders/id/chefId/', {
        method: 'GET',
        headers: {
          Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return console.log('failed query');
          }
        })
        .then(json => {
          setData(json.orders);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(setRefreshing(false));
    }
    fetchData();
  });

  useEffect(() => {
    async function fetchData() {
      // fetch orders
      fetch('http://192.168.1.73:5000/orders/id/chefId/', {
        method: 'GET',
        headers: {
          Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return console.log('failed query');
          }
        })
        .then(json => {
          setData(json.orders);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(setLoading(false));
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={true}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <>
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: 'center',
                    paddingBottom: 5,
                    paddingTop: 5,
                  }}>
                  Orders
                </Text>
              </View>
              <Divider
                style={{
                  height: 4,
                  width: responsiveWidth(96),
                  backgroundColor: '#DFE2E6',
                  alignSelf: 'center',
                }}
              />
            </>
          }
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => navigation.navigate('Chef Manage Order')}>
                <Image
                  style={{width: 100, height: 100, borderRadius: 10}}
                  source={{
                    uri:
                      'http://192.168.1.73:5000/' + item.product.productImage,
                  }}
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={{fontSize: 25}}>{item.product.name}</Text>
                  <Text style={{color: 'gray', fontSize: 20}}>
                    ${item.quantity * item.product.price}
                  </Text>
                </View>
              </TouchableOpacity>
              <Divider style={{height: 3, backgroundColor: '#DFE2E6'}} />
            </>
          )}
        />
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
  dashboard: {
    paddingTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: responsiveWidth(100),
    paddingBottom: 15,
  },
  sales: {
    flex: 1,
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    width: responsiveWidth(100),
  },
});

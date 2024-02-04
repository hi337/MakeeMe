import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Button, Divider, Image} from 'react-native-elements';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChefHome({navigation, route}) {
  const [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      fetch('http://192.168.1.73:5000/products/chefId', {
        method: 'GET',
        headers: {
          Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.log(res.error);
            return console.log('failed query');
          }
        })
        .then(json => setData(json.products))
        .catch(err => {
          console.log(err);
        })
        .finally(setRefreshing(false));
    }
    fetchData();
  });

  useEffect(() => {
    async function fetchData() {
      fetch('http://192.168.1.73:5000/products/chefId', {
        method: 'GET',
        headers: {
          Authorization: 'bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.log(res.error);
            return console.log('failed query');
          }
        })
        .then(json => setData(json.products))
        .catch(err => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Button
                onPress={() => navigation.navigate('List An Item')}
                buttonStyle={{
                  backgroundColor: 'blue',
                  borderRadius: 20,
                  width: responsiveWidth(96),
                  alignSelf: 'center',
                }}
                title={'List An Item'}
                type={'solid'}
              />
            </View>
            <View style={styles.dashboard}>
              <View style={styles.sales}>
                <Text
                  style={{fontSize: 40, paddingTop: 10, textAlign: 'center'}}>
                  $0
                </Text>
                <Text style={{color: 'gray', textAlign: 'center'}}>
                  30-day sales
                </Text>
              </View>
              <View style={styles.sales}>
                <Text
                  style={{fontSize: 40, paddingTop: 10, textAlign: 'center'}}>
                  50
                </Text>
                <Text style={{color: 'gray', textAlign: 'center'}}>
                  Items sold
                </Text>
              </View>
            </View>
            <Divider
              style={{
                height: 5,
                width: responsiveWidth(100),
                backgroundColor: '#DFE2E6',
              }}
            />
          </>
        }
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              style={styles.itemView}
              onPress={() =>
                navigation.navigate('Chef Item Page', {productId: item._id})
              }>
              <Image
                style={{width: 100, height: 100, borderRadius: 10}}
                source={{uri: 'http://192.168.1.73:5000/' + item.productImage}}
              />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontSize: 25}}>{item.name}</Text>
                <Text style={{color: 'gray', fontSize: 20}}>${item.price}</Text>
              </View>
            </TouchableOpacity>
            <Divider style={{height: 3, backgroundColor: '#DFE2E6'}} />
          </>
        )}
      />
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
  header: {
    paddingTop: 15,
  },
});

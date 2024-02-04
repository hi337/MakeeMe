import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {} from '@react-navigation/native';

function SearchPage({navigation, route}) {
  //useStates
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  function query(text) {
    setLoading(true);
    fetch('http://192.168.1.73:5000/products/q/' + text, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return console.log('failed query');
        }
      })
      .then(json => setData(json.products))
      .catch(err => {
        console.log(err);
      })
      .finally(setLoading(false));
  }

  useEffect(() => {
    fetch('http://192.168.1.73:5000/products', {method: 'GET'})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return console.log('failed query');
        }
      })
      .then(json => setData(json.products))
      .catch(err => {
        console.log(err);
      })
      .finally(setLoading(false));
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
          ListHeaderComponent={
            <>
              <View>
                <Searchbar
                  placeholder="Search here..."
                  onChangeText={text => {
                    query(text.toString());
                  }}
                  lightTheme={true}
                  platform={Platform.OS === 'android' ? 'android' : 'ios'}
                />
              </View>
              <Divider
                style={{
                  height: 4,
                  width: responsiveWidth(100),
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
                onPress={() =>
                  navigation.navigate('Item Page', {productId: item._id})
                }>
                <Image
                  style={{width: 100, height: 100, borderRadius: 10}}
                  source={{
                    uri: 'http://192.168.1.73:5000/' + item.productImage,
                  }}
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={{fontSize: 25}}>{item.name}</Text>
                  <Text style={{color: 'gray', fontSize: 20}}>
                    ${item.price}
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
  itemView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    width: responsiveWidth(100),
  },
});

export default SearchPage;

import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import '@react-navigation/native';
import {SearchBar, Divider, Image} from 'react-native-elements';
import {items} from '../../Json/sellingdata.json';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default function chefFullMenu({navigation, route}) {
  //useStates
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={true}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View>
              <SearchBar
                placeholder="Search menu here..."
                onChangeText={text => setSearch(text)}
                value={search}
                lightTheme={true}
                platform={Platform.OS === 'android' ? 'android' : 'ios'}
              />
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
                navigation.navigate('Chef Item Page', {
                  uri: item.uri,
                  name: item.name,
                  price: item.price,
                })
              }>
              <Image
                style={{width: 100, height: 100, borderRadius: 10}}
                source={{uri: item.uri}}
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
});

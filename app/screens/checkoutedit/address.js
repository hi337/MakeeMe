import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Divider, Button, Icon} from 'react-native-elements';
import {} from '@react-navigation/native';
import {} from 'react-native-gesture-handler';
import {user} from '../../Json/user.json';

function address({navigation, route}) {
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              paddingTop: 5,
              paddingBottom: 20,
            }}>
            Address
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            paddingBottom: 10,
          }}>
          Current Delivery Address
        </Text>
        <Divider />
        <Divider />
        <TouchableOpacity style={styles.setting}>
          <Text numberOfLines={2} style={styles.text}>
            {user.address}
          </Text>
        </TouchableOpacity>
        <Divider />
        <Divider />
        <View style={{paddingTop: 10}}>
          <Button
            onPress={() => navigation.navigate('Change Address')}
            icon={<Icon name={'edit'} color="blue" />}
            title={'Edit'}
            type={'outline'}
            containerStyle={{
              width: responsiveWidth(96),
              flex: 1,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: responsiveWidth(100),
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 8,
  },
  text: {
    paddingBottom: 5,
    fontSize: 17,
    paddingTop: 10,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  setting: {
    flex: 1,
    width: responsiveWidth(95),
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
  },
});

export default address;

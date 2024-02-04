import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Divider, Button, Icon} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {} from '@react-navigation/native';
import {} from 'react-native-gesture-handler';
import {user} from '../../Json/user.json';

function payment({navigation, route}) {
  //useStates
  const [checked, setChecked] = useState('');

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
            Payment
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            paddingBottom: 10,
          }}>
          Configured Payment Systems
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={user.paymentMethods}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            if (item.methodConfigured === true) {
              return (
                <>
                  <Divider />
                  <Divider />
                  <View style={styles.setting}>
                    <RadioButton
                      value={item.Name}
                      status={checked === item.Name ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(item.Name);
                        item.methodchosen = true;
                      }}
                    />
                    <Text numberOfLines={2} style={styles.text}>
                      {item.Name}
                    </Text>
                  </View>
                </>
              );
            }
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            paddingBottom: 10,
            paddingTop: 10,
          }}>
          Other Payment Systems
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={user.paymentMethods}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            if (item.methodConfigured == false) {
              return (
                <>
                  <Divider />
                  <Divider />
                  <TouchableOpacity style={styles.setting}>
                    <Text numberOfLines={2} style={styles.text}>
                      {item.Name}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    paddingBottom: 10,
    fontSize: 17,
    paddingTop: 10,
    color: 'black',
  },
  setting: {
    flex: 1,
    width: responsiveWidth(95),
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default payment;

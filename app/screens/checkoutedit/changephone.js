import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-elements';
import {user} from '../../Json/user.json';
import Icon from 'react-native-vector-icons/Ionicons';
import {responsiveWidth} from 'react-native-responsive-dimensions';

function ChangePhone({navigation, route}) {
  //useStates
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new phone number here..."
        onChangeText={text => setPhone(text)}
        value={phone}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType={'phone-pad'}
      />
      <Button
        onPress={() => (user.phoneNumber = phone)}
        icon={<Icon name={'checkmark'} color="white" size={22} />}
        title={' Confirm Change'}
        type={'solid'}
        containerStyle={{width: responsiveWidth(70)}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 20,
    borderRadius: 10,
    height: 50,
    fontSize: 22,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    color: 'green',
    width: 350,
  },
});

export default ChangePhone;

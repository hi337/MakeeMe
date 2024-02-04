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

function ChangeAddress({navigation, route}) {
  //useStates
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new address here..."
        onChangeText={text => setAddress(text)}
        value={address}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button
        onPress={() => (user.address = address)}
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
    fontSize: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    color: 'green',
    width: 350,
  },
});

export default ChangeAddress;

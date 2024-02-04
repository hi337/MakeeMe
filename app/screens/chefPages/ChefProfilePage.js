import * as React from 'react';
import {
  TouchableOpacity,
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  SectionList,
  FlatList,
} from 'react-native';
import {} from 'react-native-gesture-handler';
import {Avatar, Divider, Image} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import {Items} from '../../Json/ItemsSection.json';
import {} from '@react-navigation/native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChefProfilePage({navigation, route}) {
  //dummy data
  const uri = 'https://reactjs.org/logo-og.png';
  const chefName = "Chef's Name";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.backgroundImage} source={{uri: uri}} />
        <View style={styles.headerView}>
          <Avatar rounded source={{uri: uri}} size="large" />
          <Text style={styles.chefNameText}>{chefName}</Text>
        </View>
        <Divider style={{backgroundColor: '#DFE2E6', height: 10}}></Divider>
        <View style={styles.CardView}>
          <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
            Most Popular Items
          </Text>
          <FlatList
            style={styles.FlatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.itemcard}>
                <TouchableOpacity style={{}}>
                  <Image
                    source={{uri: item.uri}}
                    style={{width: 140, height: 140, borderRadius: 10}}
                  />
                  <Text style={styles.itemtext}>{item.Name}</Text>
                  <Text style={styles.itemcost}>${item.Price}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <Divider style={{backgroundColor: '#DFE2E6', height: 10}}></Divider>
        <View style={styles.fullMenu}></View>
        <View style={{paddingBottom: 80}} />
      </ScrollView>
      <FAB
        icon={() => <Ionicons name="menu" size={23} color={'white'} />}
        onPress={() => navigation.navigate('Chef Full Menu')}
        style={{
          backgroundColor: 'blue',
          borderRadius: 10,
          width: responsiveWidth(90),
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        label={'Full Menu'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  chefNameText: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 5,
    paddingTop: 0,
  },
  deliveryFeeAndTime: {
    fontSize: 14,
    fontFamily: 'serif',
  },
  backgroundImage: {
    width: responsiveWidth(100),
    height: 200,
    paddingBottom: 0,
  },
  headerView: {
    top: 10,
    left: 10,
    paddingBottom: 30,
  },
  scrollViewStyle: {
    flex: 1,
    width: responsiveWidth(100),
  },
  itemcard: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  CardView: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 10,
  },
  itemtext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

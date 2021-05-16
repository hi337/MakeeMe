import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { RNCamera } from 'react-native-camera';
import { } from 'react-native-gesture-handler';
import {  } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

export default function CameraPage({navigation, route}) {

    const from = route.params.from

    return(
        <SafeAreaView style={styles.container}>
            <RNCamera style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need camera permission so you can take a picture of your product',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}>
                {({ camera, status }) => {
                    if (status !== 'READY') return <PendingView />;
                    return (
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => takePicture(camera, navigation, from)} style={styles.cap}>
                            <Ionicons name={'camera'} size={60} color="black" />
                        </TouchableOpacity>
                    </View>
                    );
                }}
            </RNCamera>
        </SafeAreaView>
    );
}

async function takePicture(camera, navigation, from) {
    const options = { quality: 0.5, base64: true, orientation: 'portrait' };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri)
    navigation.navigate(from, {uri: data.uri, from: "Camera Page"})
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cap: {
        flex: 0,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 10,
        backgroundColor: 'white'
    },
})
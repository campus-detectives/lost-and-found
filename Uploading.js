import { Image, View } from 'react-native';
import React from 'react';


export default function Uploading({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141e3c' }}>
            <Image source={require('./assets/uploading.gif')} />
        </View>
    );

}
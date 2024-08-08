import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Btn } from '../Components/Button'

export default function PoiScreen() {

    return (
    <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
            <Image source={{uri:'https://lh5.googleusercontent.com/p/AF1QipO3NhYksSKZecYUztsgOASA9WehHxchCJg0nSaX=w408-h240-k-no-pi-0-ya144.16565-ro-0-fo100'}} style={styles.headerImage} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>PARC DE LA LOUVIERE</Text>
                <FontAwesome name="heart" style={styles.heartIcon} />
            </View>
        </View>
        
    </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
    },

    headerContainer: {
        marginTop:30,
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    headerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },

    title: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },

    heartIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 24,
        color: '#fff',
    },

    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 24,
        color: '#000',
    },});


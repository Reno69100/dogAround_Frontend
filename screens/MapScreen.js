import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
} from "react-native";

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useSelector, useDispatch } from 'react-redux';
import { importPlaces } from '../reducers/places'

export default function MapScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value); //Recuperation paramètres de l'utilsateur stocké dans le STORE
    const [currentPosition, setCurrentPosition] = useState(null); //Déclaration état contenant la posittion de l'utisateur

    useEffect(() => {
        //Demande autorisation partage location du téléphone
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync();
            const status = result?.status;

            if (status === 'granted') {
                //Récupération location du téléphone
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        console.log(location);
                        setCurrentPosition(location.coords);
                    });
            }
        })();
        

        //Récupération des points d'intérêts autour de l'utilisateur
        /* const params = {
            longitude:currentPosition.longitude,
            latitude:currentPosition.latitude,
            radius:user.radius,
        }; */

        /* fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/places/${params}`)
            .then((response) => response.json())
            .then((data) => {
                data.result && dispatch(importPlaces(data.places));
            }); */
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegionregion={{
                    latitude: 10,
                    longitude: 10,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {currentPosition && <Marker /* image={require("./assets/avatar.png")} */ coordinate={currentPosition} title="Ma position" pinColor="#fecb2d" />}
                {/* {markers} */}
            </MapView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

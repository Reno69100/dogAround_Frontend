import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
} from "react-native";

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useSelector, useDispatch } from 'react-redux';
import { importPlaces } from '../reducers/places'

export default function MapScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value); //Recuperation paramètres de l'utilsateur stocké dans le STORE
    const [currentPosition, setCurrentPosition] = useState({ "latitude": 50.3026331775362, "longitude": 2.796574970709902 }); //Déclaration état contenant la posittion de l'utisateur

    useEffect(() => {
        //Demande autorisation partage location du téléphone
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync();
            const status = result?.status;

            if (status === 'granted') {
                //Récupération location du téléphone
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        console.log(location.coords);
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
                region={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {currentPosition && 
                <Marker style={styles.maposition} coordinate={currentPosition} title="Ma position" pinColor="#fecb2d">
                    <Image
                        source={require("../assets/avatars/chien_1.png")}
                        style={{ width: 25, height: 25, resizeMode: "contain" }}
                    />
                </Marker>}
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
    maposition: {

    },
});

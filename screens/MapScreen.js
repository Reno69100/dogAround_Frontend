import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
} from "react-native";

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }) {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync();
            const status = result?.status;

            if (status === 'granted') {
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        setCurrentPosition(location.coords);
                    });
            }
        })();

        /* fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
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
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {currentPosition && <Marker /* image={require("./assets/avatar.png")} */ coordinate={currentPosition} title="Ma position" pinColor="#fecb2d" />}
                {markers}
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

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";

export default function ProfileScreen({ navigation }) {

    return (
        <View style={styles.container}>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#E8E9ED",
    },
    text: {
        color: "#BB7E5D",
    },
});

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import Input from "../Components/Input";
import Btn from "../Components/Button";

export default function SignUpScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            accessibilityLabel="Email Input"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            accessibilityLabel="Password Input"
          />
          <Btn
            style={styles.connection}
            title="Connection"
            onPress={handleSubmitConnection}
          />
        </View>
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

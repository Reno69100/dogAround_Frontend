import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

// Input Component
export default function Input({ value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    felx: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  input: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
  },
});

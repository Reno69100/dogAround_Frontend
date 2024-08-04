import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Btn({text}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Go To List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#7DBA84",
    borderRadius:8
  },
  text: {
    color: "white",
  },
});

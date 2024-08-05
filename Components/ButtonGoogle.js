import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image

 } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

export default function ButtonGoogle(onPress) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Image
            source={require("../assets/logo/logo-google.png")}
            style={styles.logo}
          />
          <Text style={styles.text}>Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    maxWidth: 320,
    width: 130,
    padding: 10,
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Poppins_700Bold",
  },
  logo: {
    width: 24,
    height: 24,
  },
});

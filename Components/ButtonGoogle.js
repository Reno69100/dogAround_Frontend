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

export default function ButtonGoogle() {
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
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../assets/logo-google.png")}
            style={styles.logo}
          />
          <Text style={styles.text}>Connection avec Google</Text>
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
    width: 250,
    padding: 10,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    alignItems: "center",
    borderRadius: 8,
    color: "rgb(65, 63, 63)",
    backgroundColor: "#fff",
    flexDirection:'row',
    justifyContent:'space-between'

  },
  text: {
    fontFamily: "Poppins_700Bold",
    color: "rgb(65, 63, 63)",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

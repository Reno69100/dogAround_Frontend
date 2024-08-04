import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Button,
} from "react-native";
import AppLoading from "expo-app-loading";
import Btn from "../Components/Button";
import Input from "../Components/Input";

import {
  useFonts,
  Commissioner_400Regular,
  Commissioner_500Medium,
  Commissioner_600SemiBold,
  Commissioner_700Bold,
} from "@expo-google-fonts/commissioner";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({
    Commissioner_400Regular,
    Commissioner_500Medium,
    Commissioner_600SemiBold,
    Commissioner_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const handleSubmitConnection = () => {
      fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "Commissioner_700Bold",
              color: "#416165",
              fontSize: 18,
            }}
          >
            Bienvenue sur
            <Text style={styles.text}> DOG AROUND</Text>
          </Text>

          <Button
            title="Connection Avec Google"
            onPress={() => {
              // onPress
            }}
          />
          <Button
            title="Connection Avec FaceBook"
            onPress={() => {
              // onPress
            }}
          />

          <Input value={email} onChangeText={setEmail} placeholder="E-mail" />

          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
          />

          <Btn title="Connection" onPress={handleSubmitConnection} />

          <Text
            style={{
              fontFamily: "Commissioner_700Bold",
              color: "#416165",
              fontSize: 16,
            }}
          >
            Nouveau Sur
            <Text style={styles.text}> DOG AROUND</Text>?
          </Text>

          <Btn
            title="Inscription"
            onPress={() => navigation.navigate("SignUpScreen")}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
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

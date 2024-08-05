import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
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
import ButtonGoogle from "../Components/ButtonGoogle";
import ButtonFacebook from "../Components/ButtonFacebook";

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
  }

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
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Bienvenue sur <Text style={styles.text}>DOG AROUND</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <ButtonGoogle />
          <ButtonFacebook />
        </View>

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

        <Text style={styles.newUserText}>
          Nouveau sur <Text style={styles.text}>DOG AROUND</Text>?
        </Text>

        <Btn
          title="Inscription"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#E8E9ED",
    padding: 20,
  },
  welcomeText: {
    fontFamily: "Commissioner_700Bold",
    color: "#416165",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    color: "#BB7E5D",
  },
  buttonContainer: {
    width: "100%",
    gap:10,
    alignItems: "center",
  },
  connection:{
  },
  inputContainer: {
    width: "100%",
    gap:7,
    alignItems: "center",
  },
  newUserText: {
    fontFamily: "Commissioner_700Bold",
    color: "#416165",
    fontSize: 20,
    textAlign: "center",
  },
});

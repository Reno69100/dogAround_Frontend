import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppLoading from "expo-app-loading";
import Input from "../Components/Input";
import Btn from "../Components/Button";
import ButtonFacebook from "../Components/ButtonFacebook";
import ButtonGoogle from "../Components/ButtonGoogle";
import { login } from "../reducers/user";
export default function SignUpScreen({ navigation }) {
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

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://192.168.1.73:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        pseudo: pseudo,
        password: password,
        surname: surname,
        name: name,
        city: city,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email, pseudo, city, token: data.token }));
          setEmail("");
          setPseudo("");
          setPassword("");
          setConfirmPassword("");
          setSurname("");
          setName("");
          setCity("");
          navigation.navigate("TabNavigator", { screen: "Map" });
        }
      });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.newUserText}>
            Nouveau sur <Text style={styles.text}>DOG AROUND</Text>?
          </Text>

          <View style={styles.socialContainer}>
            <Text style={styles.textConnection}>Connecter vous via: </Text>
            <View style={styles.buttonContainer}>
              <ButtonGoogle />
              <ButtonFacebook />
            </View>
          </View>

          <View style={styles.mailContainer}>
            <Text style={styles.textMail}>Ou par mail: </Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="E-mail"
                accessibilityLabel="Email Input"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                placeholder="Pseudo"
                accessibilityLabel="Username Input"
                value={pseudo}
                onChangeText={setPseudo}
              />
              <Input
                placeholder="Prénom"
                accessibilityLabel="Surname Input"
                value={surname}
                onChangeText={setSurname}
              />
              <Input
                placeholder="Nom"
                accessibilityLabel="Name Input"
                value={name}
                onChangeText={setName}
              />
              <Input
                placeholder="Ville"
                accessibilityLabel="City Input"
                value={city}
                onChangeText={setCity}
              />
              <Input
                placeholder="Mot de passe"
                accessibilityLabel="Password Input"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Input
                placeholder="Confirme Mot de passe"
                accessibilityLabel="Confirm Password Input"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Btn
                style={styles.connection}
                title="Valider"
                onPress={handleRegister}
              />
            </View>
          </View>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#E8E9ED",
  },
  text: {
    fontFamily: "Commissioner_700Bold",
    color: "#BB7E5D",
  },
  newUserText: {
    fontFamily: "Commissioner_700Bold",
    color: "#416165",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textConnection: {
    fontFamily: "Commissioner_700Bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  socialContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  textMail: {
    fontFamily: "Commissioner_700Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  mailContainer: {
    width: "100%",
    alignItems: "center",
  },
  connection: {
    marginTop: 20,
  },
});

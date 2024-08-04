import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import Btn from "../Components/Button";

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
    // confirmation des identifiants pour le SignIn hors fb et Gmail

    const handleSubmitConnection = () => {
      fetch("http://localhost:3000/user/signin")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "Commissioner_700Bold",
              color: "#416165",
              fontSize: "18px",
            }}
          >
            Bienvenue sur
            <Text style={styles.text}>DOG AROUND</Text>
          </Text>

          <Button
            title="Connection Avec Google"
            //  onPress={}
          />
          <Button
            title="Connection Avec FaceBook"
            //  onPress={}
          />

          <TextInput
            placeholder="E-mail"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
          ></TextInput>

          <Btn text="Connection" />

          <Text
            style={{
              fontFamily: "Commissioner_700Bold",
              color: "#416165",
              fontSize: "16px",
            }}
          >
            Nouveau Sur
            <Text style={styles.text}>DOG AROUND</Text>?
          </Text>

          <Btn text="Inscription" />
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

  button: {
    backgroundColor: "#7DBA84",
    height: "8%",
    width: "35%",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    backgroundColor: "#FFFFFF",
    height: "5%",
    width: "80%",
    borderRadius: "8px",
  },

  textButton: {
    fontFamily: "Poppins_600SemiBold",

    color: "#FFFFFF",
  },

  text: {
    color: "#BB7E5D",
  },
});

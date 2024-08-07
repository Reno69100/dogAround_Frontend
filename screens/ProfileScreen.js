import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Switch,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../Components/Input";
import Btn from "../Components/Button";
import { useSelector } from "react-redux";

export default function ProfilScreen({ navigation }) {

    //Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const user = useSelector((state) => state.user.value);

  const handleClickCloseScreen = () => {
    navigation.navigate("TabNavigator", { screen: "MonCompte" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClickCloseScreen}>
          <FontAwesome name="times" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.welcomeText}>
          <Text style={styles.text}>PROFIL</Text>
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/avatars/chien_1.png")}
            style={styles.avatar}
          />
        </View>
        <Input placeholder="pseudo" value={user.pseudo} style={styles.input} />
        <Input placeholder="email" value={user.email} style={styles.input} />
        <Input placeholder="Ville" value={user.city} style={styles.input} />
        <Input
          placeholder="Nouveau mot de passe"
          style={styles.input}
        />
        <Input placeholder="Confirmer mot de passe" style={styles.input} />
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#BB7E5D", true: "#7DBA84" }}
            thumbColor={isEnabled ? "#BB7E5D" : "#7DBA84"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.switchText}>
            {isEnabled ? "Profil Privé" : "Profil Public"}
          </Text>
        </View>
        <Btn title="Modifier" style={styles.connection} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E8E9ED",
    paddingTop: 40,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    marginBottom: 30,
  },
  text: {
    color: "#416165",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Commissioner_700Bold",
    marginBottom: 30,
  },
  inputContainer: {
    borderRadius: 8,
    width: "83%",
    gap: 10,
    alignItems: "center",
    padding: 30,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#416165",
  },
  connection: {
    marginTop: 20,
  },
  input: {
    marginTop: 20,
  },
});

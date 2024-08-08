import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Image
} from "react-native";

import ModalAvatar from "../Components/ModalAvatar";

import FontAwesome from "react-native-vector-icons/FontAwesome6";

export default function CompagnonScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || null);

  const handleClickOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar.source);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={10}>
        <TextInput
          style={styles.title}
          placeholder="Editer Nom"
          value={name}
          onChangeText={(value) => setName(value)}>
        </TextInput>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/avatars/chien_1.png")}
            style={styles.avatar}
          />
        </View>
        <TouchableOpacity
          style={styles.plusIcon}
          onPress={handleClickOpenModal}
        >
          <FontAwesome name="plus" size={21} color="#BB7E5D" />
        </TouchableOpacity>
        <ModalAvatar
          visible={isModalVisible}
          onClose={handleCloseModal}
          onSelect={handleSelectAvatar}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>);
}

const styles = StyleSheet.create({
  container: {
    padding: Dimensions.get('window').height * 0.1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#BB7E5D",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: '#416165',
    padding: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    margin: 10,
    minWidth: Dimensions.get('window').width * 0.5,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 5,
  },
});

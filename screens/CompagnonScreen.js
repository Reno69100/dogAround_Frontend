import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

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
  Image,
  Platform,
  ScrollView
} from "react-native";

import ModalAvatar from "../Components/ModalAvatar";
import Btn from "../Components/Button";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Dropdown } from 'react-native-element-dropdown';

export default function CompagnonScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);

  const [name, setName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [weigth, setWeigth] = useState('');
  const [sex, setSex] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const datasex = [
    { label: 'Male', value: '1' },
    { label: 'Femelle', value: '2' },
  ];

  const handleClickCloseScreen = () => {
    navigation.navigate("TabNavigator", { screen: "Compte" });
  };

  const handleClickOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar.source);
  };

  const handleValidation = () => {
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/companions/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token:user.token,
        avatar: selectedAvatar,
        name: name,
        weigth: weigth,
        dogBreed: dogBreed,
        sex: sex,
        comment: comment,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("TabNavigator", { screen: "Compte" });
        } else {
          setErrorMessage(data.error);
        }
      })
  };

  const scroll = useRef();

  useEffect(() => {
    //Récupération donnée compagnon
    if (isFocused) {
      if (route.params.compagnon) {
        fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/companions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: user.token
          })
        })
          .then((response) => response.json())
          .then((data) => {
            const datacompanion = data.companions.filter(e=> e.name===route.params.compagnon)[0];
            if (data.result) {
              setName(datacompanion.name);
              setDogBreed(datacompanion.dogBreed);
              setWeigth(datacompanion.weight);
              setSex(datacompanion.sex);
              setComment(datacompanion.comment);
              setSelectedAvatar(datacompanion.avatar);
            }
          });
      }
      else {
        setName(null);
        setDogBreed(null);
        setWeigth(null);
        setSex(null);
        setComment(null);
        setSelectedAvatar(require("../assets/avatars/chien_1.png"));
      }
    }
  }, [isFocused])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={10}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          ref={scroll}
          onContentSizeChange={() => {
            scroll.current.scrollToEnd();
          }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClickCloseScreen}>
              <FontAwesome name="times" size={25} color="#000" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.title}
            placeholder="Editer Nom"
            value={name}
            onChangeText={(value) => setName(value)}>
          </TextInput>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  selectedAvatar ||
                  require("../assets/avatars/chien_1.png")
                }
                style={styles.avatar}
              />
            </View>
            <TouchableOpacity
              style={styles.plusIcon}
              onPress={handleClickOpenModal}
            >
              <FontAwesome name="plus" size={21} color="#BB7E5D" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Race"
              value={dogBreed}
              onChangeText={(value) => setDogBreed(value)}>
            </TextInput>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={datasex}
              search={false}
              labelField="label"
              valueField="value"
              placeholder='Select'
              value={sex}
              onChange={item => {
                setSex(item.value);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Poids en kg"
              value={weigth}
              onChangeText={(value) => setWeigth(value)}>
            </TextInput>
          </View>
          <TextInput
            style={styles.comment}
            placeholder="Description"
            value={comment}
            multiline={true}
            onChangeText={(value) => setComment(value)}>
          </TextInput>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <Btn
            style={styles.button}
            title="Valider"
            onPress={handleValidation}
          />
          <ModalAvatar
            visible={isModalVisible}
            onClose={handleCloseModal}
            onSelect={handleSelectAvatar}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    width: "100%",
    backgroundColor: "#BB7E5D",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: Dimensions.get('window').width,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: '#416165',
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 20,
    minWidth: Dimensions.get('window').width * 0.5,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    position: "relative",
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
    position: "relative",
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
  input: {
    width: Dimensions.get('window').width * 0.6,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 10,
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  comment: {
    minHeight: 100,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 20,
    width: Dimensions.get('window').width * 0.8,
  },
  button: {
    marginTop: 20,
  },
  dropdown: {
    width: Dimensions.get('window').width * 0.6,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },

});

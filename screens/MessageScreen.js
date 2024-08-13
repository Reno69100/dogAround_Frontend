import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Platform,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../Components/Input";

export default function MessageScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value); //Recuperation paramètres de l'utilsateur stocké dans le STORE
  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(false);
  const [dataMessage, setDataMessage] = useState([]);

  //Récuparation props
  const discussion_id = route.params.discussion_id;
  const discussion_pseudo = route.params.pseudo;

  //Retour au ChatScreen
  const handleClickBack = () => {
    navigation.navigate("TabNavigator", { screen: "Chat" });
  };

  //Nouveau message
  const newMessage = (message) => {
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/discussions/messages/${user.token}?id=66bb175a54cedf833219949f`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message
      })
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && setUpdate(!update);
      })
  };

  useEffect(() => {
    //Initialisation
    //Récupération de tous les messages
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/discussions/messages/${user.token}?id=66bb175a54cedf833219949f`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && setDataMessage(data.messages);
      });
  }, [])

  //Mise à jour de l'affichage
  const listMessage = dataMessage.map((e, i) => {
    const hours = new Date(e.date).toLocaleTimeString().slice(0, 5);
    //Message envoyé
    if (user.pseudo !== e.pseudo) {
      return (
        <View key={i} style={styles.messageWrapper}>
          <View style={styles.messageBubble}>
            <View style={styles.messageHeader}>
              <Image
                source={e.avatar}
                style={styles.avatar}
              />
              <View style={styles.messageInfo}>
                <Text style={styles.messageName}>{e.pseudo}</Text>
                <Text style={styles.messageTime}>{hours}</Text>
              </View>
            </View>
            <Text style={styles.messageText}>{e.message}</Text>
          </View>
        </View>
      )
    }
    //Message reçu
    else {
      return (
        <View key={i} style={[styles.messageWrapper, styles.messageWrapperSend]}>
          <View style={styles.messageBubbleSend}>
            <View style={styles.messageHeaderSend}>
              <Image
                source={e.avatar}
                style={styles.avatar}
              />
              <View style={styles.messageInfoSend}>
                <Text style={styles.messageNameSend}>{e.pseudo}</Text>
                <Text style={styles.messageTimeSend}>{hours}</Text>
              </View>
            </View>
            <Text style={styles.messageTextSend}>{e.message}</Text>
          </View>
        </View>
      )
    }
  })

  const scroll = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.headerMessage}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPressOut={handleClickBack}>
          <FontAwesome name="arrow-left" size={40} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{discussion_pseudo}</Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={10}>
        <ScrollView contentContainerStyle={styles.messageContainer}
          keyboardDismissMode='on-drag'
          ref={scroll}
          onContentSizeChange={() => {
            scroll.current.scrollToEnd();
          }}>
          {listMessage}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Input style={styles.input} placeholder="Message..." value={message} onChangeText={(value) => setMessage(value)} />
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={() => newMessage(message)}>
          <FontAwesome name="paper-plane" size={25} color="#7DBA84" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E9ED",
    paddingTop: 40,
    justifyContent: "space-between"
  },
  headerMessage: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: "center",
    height: 60,
    width: 60,
    backgroundColor: 'blue'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  messageContainer: {
    padding: 10,
    /* flexGrow: 1, */
  },
  messageWrapper: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  messageWrapperSend: {
    flexDirection: "row-reverse",
  },
  messageBubble: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    paddingBottom: 5,
    maxWidth: "80%",
    flex: 1,
  },
  messageBubbleSend: {
    backgroundColor: "#7DBA84",
    borderRadius: 15,
    padding: 10,
    paddingBottom: 5,
    maxWidth: "80%",
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  messageHeaderSend: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "flex-start",
  },
  messageInfoSend: {
    marginRight: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  messageName: {
    fontWeight: "bold",
  },
  messageNameSend: {
    fontWeight: "bold",
    textAlign: "right",
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  messageTimeSend: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    textAlign: "left",
  },
  messageText: {
    fontSize: 16,
  },
  messageTextSend: {
    fontSize: 16,
    color: "#FFF",
  },
  footer: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

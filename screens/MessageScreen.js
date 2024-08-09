import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../Components/Input";

export default function MessageScreen({ navigation }) {
  const handleClickBack = () => {
    navigation.navigate("TabNavigator", { screen: "Chat" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerMessage}>
        <TouchableOpacity style={styles.iconButton} onPress={handleClickBack}>
          <FontAwesome name="arrow-left" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Renaud</Text>
      </View>
      <ScrollView contentContainerStyle={styles.messageContainer}>
        <View style={styles.messageWrapper}>
          <View style={styles.messageBubble}>
            <View style={styles.messageHeader}>
              <Image
                source={require("../assets/avatars/chien_1.png")}
                style={styles.avatar}
              />
              <View style={styles.messageInfo}>
                <Text style={styles.messageName}>Renaud</Text>
                <Text style={styles.messageTime}>10:30</Text>
              </View>
            </View>
            <Text style={styles.messageText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Text>
          </View>
        </View>
        <View style={[styles.messageWrapper, styles.messageWrapperSend]}>
          <View style={styles.messageBubbleSend}>
            <View style={styles.messageHeaderSend}>
              <Image
                source={require("../assets/avatars/chien_1.png")}
                style={styles.avatar}
              />
              <View style={styles.messageInfoSend}>
                <Text style={styles.messageNameSend}>Gaspard</Text>
                <Text style={styles.messageTimeSend}>10:31</Text>
              </View>
            </View>
            <Text style={styles.messageTextSend}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Input style={styles.input} placeholder="Message..." />
        <TouchableOpacity style={styles.sendButton}>
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
  },
  headerMessage: {
    marginTop: 30,
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  iconButton: {
    marginLeft:10,
    marginRight: 10,
    marginTop:10,
    width:50,
    height:40,
    alignItems:'center'
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
    flexGrow: 1,
    justifyContent: "flex-end",
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
    paddingHorizontal: 15,
    justifyContent: "space-between",
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

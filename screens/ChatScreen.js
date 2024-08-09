import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import TextContainer from "../Components/TextContainer";
import Input from "../Components/Input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ModalInvitation from "../Components/ModalInvitation";

export default function ChatScreen({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = ["Christine", "John", "Doe", "Gaspard", "Leo", "Mathieu", 'Reno'];
  const messages = ["Reno", "Leo", "Mathieu", "Gaspard", "John", "Doe"];

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleClickOpenMessage = () =>{
    navigation.navigate('Message')
  }

  const handleOpenInvitation = (contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        <Text style={styles.text}>CONTACTS</Text>
      </Text>
      <View style={styles.searchAndContactContainer}>
        <View style={styles.searchContainer}>
          <Input placeholder="Rechercher un(e) ami(e)" />
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="search" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.ContactScrollView}>
          <View style={styles.Contact}>
            {contacts.map((contact, i) => (
              <View key={i} style={styles.contactRow}>
                <TextContainer
                  title={contact}
                  style={styles.ContactContainer}
                />
                <TouchableOpacity
                  onPress={() => handleOpenInvitation(contact)} // Passer le contact sélectionné
                  style={styles.iconButton}
                >
                  <FontAwesome name="plus" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Text style={styles.welcomeText}>
        <Text style={styles.text}>MESSAGERIE</Text>
      </Text>
      <View style={styles.NewMessage}>
        <ScrollView style={styles.scrollView}>
          {messages.map((message, i) => (
            <View key={i} style={styles.messageRow}>
              <Image
                source={require("../assets/avatars/chien_1.png")}
                style={styles.avatar}
              />
              <TextContainer
                title={message}
                style={styles.containerNewMessage}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <ModalInvitation
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSelect={handleClickOpenMessage}
        name={selectedContact}
      />
    </View>
  );
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
  welcomeText: {
    marginBottom: 10,
  },
  text: {
    color: "#416165",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Commissioner_700Bold",
    marginBottom: 20,
  },
  searchAndContactContainer: {
    width: "80%",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 5,
  },
  ContactScrollView: {
    maxHeight: 165,
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  Contact: {
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  ContactContainer: {
    width: "80%",
    color: "#416165",
    fontSize: 16,
    fontWeight: "normal",
  },
  iconButton: {
    padding: 5,
  },
  NewMessage: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    marginTop: 0,
    maxHeight: 215,
  },
  scrollView: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  containerNewMessage: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
  },
});

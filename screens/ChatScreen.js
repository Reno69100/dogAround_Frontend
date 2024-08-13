import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import TextContainer from "../Components/TextContainer";
import Input from "../Components/Input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ModalInvitation from "../Components/ModalInvitation";
import ModalInvitationAnswer from "../Components/ModalInvitationAnswer";
import { useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export default function ChatScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAnswerVisible, setIsModalAnswerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contacts, setContacts] = useState([]);

  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  //Fonction recherche d'un contact
  const searchContact = () => {
    setErrorMessage("");

    fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/${user.token}/pseudos?search=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        /* console.log(data) */
        if (data.result) {
          const pseudoFilter = data.pseudos.filter(e => {
            return ((e !== user.pseudo) && (!contacts.some((contact) => { return (e === contact.pseudo) })))
          })
          /* setSearchContacts(data.pseudos); */
          if (pseudoFilter.length > 0) {
            setSearchContacts(pseudoFilter);
          }
          else {
            setSearchContacts([]);
            setSearchQuery("")
            setErrorMessage("Aucun utilisateur trouvé");
          }
        } else {
          setSearchContacts([]);
          setSearchQuery("")
          setErrorMessage("Aucun utilisateur trouvé");
        }
      });
  };

  //Fonction récupération liste des contacts
  const contactMessage = () => {
    fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/contacts/${user.token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setContacts(
            data.contacts.map((contact) => ({
              pseudo: contact.pseudo,
              avatar: contact.avatar,
              invitation: contact.invitation,
              discussion_id: contact.discussion_id,
            })).reverse()
          );
        } else {
          setContacts([]);
        }
      });
  };

  //Fonction Fermeture Modal invitation
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  //Fonction ouverture Modal invitation
  const handleOpenInvitation = (contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  //Fonction Fermeture Modal réponse invitationn
  const handleCloseModalAnswer = () => {
    setIsModalAnswerVisible(false);
  };

  //Fonction ouverture Modal réponse invitation
  const handleOpenInvitationAnswer = (contact) => {
    setSelectedContact(contact);
    setIsModalAnswerVisible(true);
  };

  //Fonction envoi invitation
  const handleClickForInvitation = () => {
    fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/invitation/${user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: selectedContact }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setIsModalVisible(false);
          setSearchQuery("");
          setSearchContacts([]);
          contactMessage();
        }
      });
  };

  //Fonction réponse invitation
  const handleClickForInvitationAnswer = (answer) => {
    fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/invitation/${user.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: selectedContact, answer: answer }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setIsModalAnswerVisible(false);
          contactMessage();
        }
      });
  };

  //Fonction ouverture MessageScreen avec props
  const handleClickOpenMessage = (contact) => {
    setIsModalVisible(false);
    setIsModalAnswerVisible(false);
    if (contact.invitation === 'accepted') {
      navigation.navigate("Message", { discussion_pseudo: contact.pseudo, discussion_id: contact.discussion_id });
    }
    else if (contact.invitation === 'received') {
      handleOpenInvitationAnswer(contact.pseudo);
    }
  };

  useEffect(() => {
    if (isFocused) {
      contactMessage();
    }
  }, []);

  //Rendu de la liste de contacts affichés
  const listContacts = contacts.map((contact, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.contactRow}
        onPress={() => handleClickOpenMessage(contact)}
      >
        <Image source={contact.avatar} style={styles.avatar} />
        <View style={styles.contactInfo}>
          <TextContainer
            title={contact.pseudo}
            style={styles.containerNewMessage}
          />
          {/* <Text style={styles.invitationText}>
          {contact.invitation === "issued"
            ? "Invitation Envoyée"
            : "No Invitation"}
        </Text> */}
          {(contact.invitation === "issued") && <Text style={[styles.invitationText]}>Attente</Text>}
          {(contact.invitation === "received") && <Text style={[styles.invitationText, { color: "#00CC00" }]}>Invitation ?</Text>}
          {(contact.invitation === "denied") && <Text style={[styles.invitationText, { color: "#FF0000" }]}>Refusée</Text>}
        </View>
      </TouchableOpacity>
    )
  });

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setIsModalVisible(false);
      setIsModalAnswerVisible(false);
    }} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <Text style={styles.welcomeText}>
          <Text style={styles.text}>CONTACTS</Text>
        </Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View style={styles.searchAndContactContainer}>
          <View style={styles.searchContainer}>
            <Input
              placeholder="Rechercher un(e) ami(e)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.iconButton} onPress={searchContact}>
              <FontAwesome name="search" size={25} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.ContactScrollView}>
            <View style={styles.Contact}>
              {searchContacts.length > 0 &&
                searchContacts.map((contact, i) => (
                  <View key={i} style={styles.contactRow}>
                    <TextContainer
                      title={contact}
                      style={styles.ContactContainer}
                    />
                    <TouchableOpacity
                      onPress={() => handleOpenInvitation(contact)}
                      style={styles.iconButton}
                    >
                      <FontAwesome name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.messagerie}>
          <Text style={styles.text}>MESSAGERIE</Text>
          <TouchableOpacity
            style={styles.IconMessagerie}
            onPress={contactMessage}
          >
            <FontAwesome name="rotate-right" size={40} color="#416165" />
          </TouchableOpacity>
        </View>

        <View style={styles.contactlist}>
          <ScrollView style={styles.scrollView}>
            {listContacts}
          </ScrollView>
        </View>

        <ModalInvitation
          visible={isModalVisible}
          onClose={handleCloseModal}
          onSelect={handleClickForInvitation}
          name={selectedContact}
        />

        <ModalInvitationAnswer
          visible={isModalAnswerVisible}
          onClose={handleCloseModalAnswer}
          onSelect={handleClickForInvitationAnswer}
          name={selectedContact}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  text: {
    color: "#416165",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Commissioner_700Bold",
    marginRight: 30,
  },
  searchAndContactContainer: {
    width: "80%",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  ContactScrollView: {
    maxHeight: 165,
  },
  Contact: {
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10
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
  contactlist: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    marginTop: 0,
    maxHeight: 300,
  },
  scrollView: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contactInfo: {
    /* flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", */
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  containerNewMessage: {
    color: "#416165",
    fontSize: 16,
    fontWeight: "normal",
    /* flexShrink: 1, */
  },
  invitationText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "bold",
    /* flexGrow: 1, */
    /* textAlign: "right", */
    /* width:10, */
  },
  messagerie: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconMessagerie: {
    paddingBottom: 20,
  },
});

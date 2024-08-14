import React, { useState, useEffect, useRef } from "react";
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
  Dimensions
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
  /* const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); */
  const [contacts, setContacts] = useState([]);

  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  /* console.log(contacts) */

  //Raz recherche d'un contact
  const onClearPress = () => {
    setSearchContacts([]);
  }

  //Fonction recherche d'un contact
  /* const searchContact = () => {
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
        if (data.result) {
          const pseudoFilter = data.pseudos.filter(e => {
            return ((e !== user.pseudo) && (!contacts.some((contact) => { return (e === contact.pseudo) })))
          })
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
  }; */

  const searchContact = (query) => {
    // Prevent search with an empty query
    if (query === '') {
      return;
    }

    fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/${user.token}/pseudos?search=${query}`,
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
          const pseudoFilter = data.pseudos.filter(e => {
            return ((e !== user.pseudo) && (!contacts.some((contact) => { return (e === contact.pseudo) })))
          })
          const suggestions = pseudoFilter.map((data, i) => {
            return { id: (i + 1), title: data };
          });
          setSearchContacts(suggestions);

        } else {
          setSearchContacts([]);
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
          /* console.log(data.contacts) */
          setContacts(
            data.contacts.map((contact) => ({
              pseudo: contact.pseudo,
              avatar: contact.avatar,
              invitation: contact.invitation,
              discussion: contact.discussion,
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
    setSearchContacts([]);
  };

  //Fonction ouverture Modal invitation
  const handleOpenInvitation = (contact) => {
    setSelectedContact(contact);
    setSearchContacts([]);
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
          /* setSearchQuery(""); */
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
      navigation.navigate("Message", { discussion_pseudo: contact.pseudo, discussion_id: contact.discussion._id });
    }
    else if (contact.invitation === 'received') {
      handleOpenInvitationAnswer(contact.pseudo);
    }
  };

  //Affichage nouveau message
  const showNewMessage = (contact) => {
    try {
      if ((contact.invitation === "accepted")
        && (contact.discussion.newMessage.pseudo !== null)
        && (contact.discussion.newMessage.pseudo !== user.pseudo)) {
        return (<Text style={[styles.invitationText, { color: "#0000CC" }]}>Nouveau message</Text>)
      }
    }
    catch {
    }
  }

  useEffect(() => {
    if (isFocused) {
      contactMessage();
    }
  }, [isFocused]);

  //Rendu de la liste de contacts affichés
  const listContacts = contacts.sort((a, b) => a.pseudo.localeCompare(b.pseudo)).map((contact, i) => {
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
          {(contact.invitation === "issued") && <Text style={[styles.invitationText]}>Attente réponse</Text>}
          {(contact.invitation === "received") && <Text style={[styles.invitationText, { color: "#00CC00" }]}>Invitation ?</Text>}
          {(contact.invitation === "denied") && <Text style={[styles.invitationText, { color: "#FF0000" }]}>Refusée</Text>}
          {showNewMessage(contact)}

        </View>
      </TouchableOpacity>
    )
  });

  const scroll = useRef();

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setIsModalVisible(false);
      setIsModalAnswerVisible(false);
    }} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        {/* <ScrollView contentContainerStyle={styles.container}
          keyboardDismissMode='on-drag'
          ref={scroll}
          onContentSizeChange={() => {
            scroll.current.scrollTo({ x: 0, y: 0, animated: true });
          }}> */}
        <View style={styles.container}>
          <View style={styles.searchAndContactContainer}>
            <Text style={styles.text}>CONTACTS</Text>
            {/* {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null} */}

            {/* <View style={styles.searchContainer}>
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
            </ScrollView> */}

            <AutocompleteDropdown
              debounce={500}
              onChangeText={(value) => searchContact(value)}
              onSelectItem={(item) => item && handleOpenInvitation(item.title)}
              dataSet={searchContacts}
              textInputProps={{
                placeholder: 'Rechercher un(e) ami(e)',
                style: {
                  fontSize: 16,
                },
              }}
              direction={Platform.select({ ios: 'down' })}
              inputContainerStyle={styles.inputdropdownContainer}
              containerStyle={styles.dropdownContainer}
              suggestionsListContainerStyle={styles.suggestionListContainer}
              suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
              clearOnFocus={false}
              closeOnSubmit={true}
              onClear={() => onClearPress()}
            />
          </View>

          <View style={styles.messagerieContainer}>
            <View style={styles.messagerie}>
              <Text style={styles.text}>MESSAGERIE</Text>
              <TouchableOpacity
                style={styles.IconMessagerie}
                onPress={contactMessage}
              >
                <FontAwesome name="rotate-right" size={30} color="#416165" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              {listContacts}
            </ScrollView>
            {/* <View style={styles.contactlist}>
            <ScrollView style={styles.scrollView}>
              {listContacts}
            </ScrollView>
          </View> */}
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
          {/* </ScrollView> */}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#E8E9ED",
    paddingTop: 40,
  },
  text: {
    color: "#416165",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Commissioner_700Bold",
    padding: 10,
  },
  searchAndContactContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "80%"
  },
  messagerieContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
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
    width: "80%",
    maxHeight: 165,
  },
  Contact: {
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  /* contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10
  }, */
  ContactContainer: {
    width: "90%",
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
    width: "80%",
    height: Dimensions.get('window').height * 0.6,
    /* borderBottomWidth: 1, */
    borderBottomColor: "#ddd",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    /* borderWidth:1, */
    borderRadius: 8,
    backgroundColor: '#FFF'
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
    padding: 10
  },
  IconMessagerie: {

  },
  dropdownContainer: {
    width: '100%',
  },
  inputdropdownContainer: {
    backgroundColor: '#ffffff',
  },
  suggestionListContainer: {
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
  },
});

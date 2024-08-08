import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import Btn from "./Button";
<<<<<<< HEAD

const avatars = [
  // { id: "1", source: require("../assets/avatars/chien_1.png") },
  { id: "1", source: uri='https://asset.cloudinary.com/ddn1jozka/25656bb7d1d3f3676706cd686dc5ee21' },
  //{ id: "2", source: require("../assets/avatars/chien_2.png") },
  { id: "2", source: uri='https://asset.cloudinary.com/ddn1jozka/36840fe79da3506f0ae499cab194c698' },
  { id: "3", source: require("../assets/avatars/chien_3.png") },
  { id: "4", source: require("../assets/avatars/chien_4.png") },
  { id: "5", source: require("../assets/avatars/chien_5.png") },
  { id: "6", source: require("../assets/avatars/chien_6.png") },
  { id: "7", source: require("../assets/avatars/chien_7.png") },
  { id: "8", source: require("../assets/avatars/chien_8.png") },
  { id: "9", source: require("../assets/avatars/chien_9.png") },
  { id: "10", source: require("../assets/avatars/chien_10.png") },
];
=======
import Correspondance from "../assets/avatars/Correspondance";
>>>>>>> 16cdade44c4d90c77733c98fcd5b5869eb81094f

const ModalAvatar = ({ visible, onClose, onSelect }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choisir un avatar</Text>
          <FlatList
            data={Correspondance}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.avatarItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Image source={item.source} style={styles.avatarImage} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity style={styles.modalButton}>
            <Btn title="Valider" onPress={onClose} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  avatarItem: {
    flex: 1,
    margin: 40,
    alignItems: "center",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default ModalAvatar;

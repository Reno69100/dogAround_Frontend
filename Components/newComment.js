import React, { useState } from "react";
import { useSelector } from 'react-redux';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Btn from "./Button";
import Input from "./Input";
import TextContainer from "./TextContainer";
import Correspondance from "../assets/avatars/Correspondance";

export default function NewComment({ name }) { // Correction: utilisation des accolades pour passer les props
  const [commentText, setCommentText] = useState('');

  //date système
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('fr-FR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.newCommentContainer}> 
      <View style={styles.commentTitle}>
        <Image
          style={styles.userAvatar}
          source={require('../assets/avatars/Correspondance.png')} 
        />
        <View style={styles.commentTextContainer}>
          <Text style={styles.commentPseudo}>{name}</Text>
          <Text style={styles.commentTime}>le {formattedDate}</Text> 
        </View>
      </View>
      <Input
        style={styles.newCommentInput}
        placeholder="Ajouter un commentaire..."
        multiline={true}
        numberOfLines={4}
        onChangeText={(comment) => setCommentText(comment)}
      />
      <Btn title="Commenter" style={styles.btnPublier} />
    </View>
  );
}

const styles = StyleSheet.create({
  newCommentContainer: { 
    // Ajoutez vos styles ici
  },

  userAvatar: {
    height: 20,
    width: 20,
  },

  commentTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },

  commentTextContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  commentPseudo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#795C5F", // Correction: une seule dièse pour les couleurs hexadécimales
    paddingLeft: 10,
    paddingRight: 10,
  },

  commentTime: {
    fontSize: 12, // Ajout de styles pour la date
    color: "#666",
  },

  commentText: {
    alignItems: "center",
    fontSize: 14,
    color: "#333",
    paddingLeft: 10,
    paddingRight: 10,
  },

  commentParent: {
    flexWrap: "nowrap",
    alignItems: "flex-start",
    marginLeft: 30,
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  newCommentInput: {
    // Ajoutez vos styles ici
  },

  btnPublier: {
    // Ajoutez vos styles ici
  },
});

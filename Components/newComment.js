import React, { useState } from "react";
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


export default function newComment(name,avatar){
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
    <View style={styles.newComentContainer}>
      <View style={styles.commentTitle}>
        <Image
          style={styles.userAvatar}
          source={require({avatar})} 
        />
        <View style={styles.commentTextContainer}>
          <Text style={styles.commentPseudo}>{name}</Text>
          <Text style={styles.commentTime}>le {day}-{month} à {hour}:{minute} </Text>
        </View>
      </View>
      <Input
        style={styles.newCommentInput}
        placeholder="Ajouter un commentaire..."
        multiline={true}
        numberOfLines={4}
        onChangeText={(comment) => setCommentText(comment)}
      />
      <Btn title="Commenter" style={styles.btnPublier}></Btn>
    </View>
  )

  //style
  const styles = StyleSheet.create({

    newComentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",  
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },

    commentTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },

    userAvatar: {
      width: 40,
      height: 40,
    },

    commentTextContainer: {
      marginLeft: 10,
    },

    commentPseudo: {
      fontSize: 16,
      fontWeight: "bold",
    },

    commentTime: {
      fontSize: 14,
      color: "#666",
    },

    newCommentInput: {
      padding: 5,
      marginBottom: 10,
      width: "90%",
    },

    btnPublier: {
      width: 125
    },

  })


}

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function EventScreen({ navigation, route }) {
  const { image, nom } = route.params;

  const event = useSelector((store) => store.event.value)

  const handleClickCloseScreen = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleClickCloseScreen}
        style={styles.closeIcon}
      >
        <FontAwesome name="times" size={25} color="#FFF" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.headerImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{nom}</Text>
      </View>
      <Text>{event.nom}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E9ED",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  headerImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  titleContainer: {
    top: 104,
    position: "absolute",
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  heartIcon: {
    fontSize: 24,
  },
});

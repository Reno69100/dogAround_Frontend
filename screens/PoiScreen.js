import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Btn from "../Components/Button";
import Input from "../Components/Input";

export default function PoiScreen({ navigation }) {
  const handleClickCloseScreen = () => {
    navigation.navigate("TabNavigator", { screen: "Map" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleClickCloseScreen}
          style={styles.closeIcon}
        >
          <FontAwesome name="times" size={25} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://lh5.googleusercontent.com/p/AF1QipO3NhYksSKZecYUztsgOASA9WehHxchCJg0nSaX=w408-h240-k-no-pi-0-ya144.16565-ro-0-fo100",
          }}
          style={styles.headerImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PARC DE LA LOUVIERE</Text>
          <FontAwesome name="heart" style={styles.heartIcon} />
        </View>
      </View>

      <View style={styles.corpModale}>
        <View style={styles.likeLine}>
          <View style={styles.likeZone}>
            <FontAwesome name="thumbs-o-up" size={25} />
            <Text style={styles.likeText}>630</Text>
          </View>
          <View style={styles.btnContainer}>
            <Btn title="Evénement !" style={styles.eventButton} />
            </View>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Adresse:</Text>
          <Text style={styles.infoText}>2 rue la louviere</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Horaires:</Text>
          <Text style={styles.infoText}>06H - 23H</Text>
        </View>

        <Text style={styles.detailText}>Description</Text>
        <ScrollView style={styles.scrollDescription}>
                <Text style={styles.commentText}>
                description text ...... description text ...... description text
                ...... description text ...... description text ...... description
                text ...... description text ...... description text ......
                </Text>
        </ScrollView>

        <Btn
          title="Itineraire vers ce lieu"
          style={styles.boutonItineraire}
        ></Btn>

        <Btn
          title="Ajouter un événement"
          style={styles.boutonItineraire}
        ></Btn>


        <View style={styles.commentaireHeader}>
          <Text style={styles.detailText}>Commentaires:</Text>
          <FontAwesome name="plus" style={styles.plusIcon} />
        </View>

        <ScrollView style={styles.scrollCommentaire}>

            <View style={styles.commentaireContainer}>
                <View style={styles.commentTitle}>
                    <Image
                        style={styles.userAvatar}
                        source={require("../assets/avatars/chien_1.png")}
                    />
                    <View style={styles.commentTextContainer}>
                        <Text style={styles.commentPseudo}>LULU</Text>
                        <Text style={styles.commentTime}>il y a 1h :</Text>
                    </View>
                </View>
                <View style={styles.commentParent}>
                    <Text style={styles.commentText}>
                        commentaire ......commentaire ......commentaire
                        ......commentaire ......commentaire
                    </Text>
                </View>         
            </View>

            <View style={styles.commentaireContainer}>
                <View style={styles.commentTitle}>
                    <Image
                        style={styles.userAvatar}
                        source={require("../assets/avatars/chien_2.png")}
                    />
                    <View style={styles.commentTextContainer}>
                        <Text style={styles.commentPseudo}>MOMO</Text>
                        <Text style={styles.commentTime}>il y a 2h :</Text>
                    </View>
                </View>
                <View style={styles.commentParent}>
                    <Text style={styles.commentText}>
                        commentaire ......commentaire ......commentaire
                        ......commentaire ......commentaire
                    </Text>
                </View>         
            </View>

            <View style={styles.commentaireContainer}>
                <View style={styles.commentTitle}>
                    <Image
                        style={styles.userAvatar}
                        source={require("../assets/avatars/chien_3.png")}
                    />
                    <View style={styles.commentTextContainer}>
                        <Text style={styles.commentPseudo}>REX</Text>
                        <Text style={styles.commentTime}>il y a 3h :</Text>
                    </View>
                </View>
                <View style={styles.commentParent}>
                    <Text style={styles.commentText}>
                        commentaire ......commentaire ......commentaire
                        ......commentaire ......commentaire
                    </Text>
                </View>         
            </View>
                     
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#E8E9ED",
  },

  headerContainer: {
    position: "relative",
    marginTop: 30,
  },

  titleContainer: {
    position: "absolute",
    zIndex: 2,
    top: 110,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  headerImage: {
    zIndex: 0,
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },

  title: {
    bottom: 0,
    left: 0,
    width: "100%",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
  },

  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 24,
    color: "#fff",
    marginRight: 8,
  },

  closeIcon: {
    padding: 10,
    position: "absolute",
    top: 1,
    right: 10,
    padding: 10,
    zIndex: 2,
  },

  corpModale: {
    marginTop: 5,
  },

  likeLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  likeZone: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  likeText: {
    marginLeft: 8,
    fontSize: 20,
    color:'#416165',
    fontWeight: 'bold',
  },

  btnContainer: {
    flexDirection: "row",
  },

  boutonItineraire: {
    width: "90%",
    height: 30,
    marginVertical: 5,
    alignItems: "center",
    marginLeft: 20,
    fontSize: "12",
    paddingVertical: 1,
  },

  eventButton: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    height: 25,
    width: 125,
    justifyContent: "center",
    marginRight: 5,
  },

  addEventBtn: {
    marginLeft: 1,
    paddingHorizontal: 5,
    paddingVertical: 1,
    height: 25,
    width: 30,
    justifyContent: "center",
  },

  eventButtonText: {
    fontSize: 8,
    textAlign: "center",
  },

  detailContainer: {
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 1,
  },

  plusIcon: {
    fontSize: 25,
    color: "#BB7E5D",
    marginRight: 8,
  },

  detail: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  detailText: {
    flexWrap: "nowrap",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#416165",
    paddingLeft: 10,
    marginRight: 16,
  },

  infoText: {
    fontSize: 14,
    marginBottom: 1,
    color: "#666",
  },

  scrollDescription: {
    flexWrap: "nowrap",
    textAlign:'center',
    maxHeight: 200,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 15,
  },

  descriptionText: {
    flexWrap: "nowrap",
    fontSize: 14,
    color: "#333",
  },

  commentaireContainer: {
    backgroundColor: "#FFF",
    marginbottom: 10,
  },

  commentaireHeader: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scrollCommentaire:{
    marginBottom: 5,
    maxHeight: 180,
    borderRadius:10,
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
    color: "##795C5F",
    paddingLeft: 10,
    paddingRight: 10,
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

});

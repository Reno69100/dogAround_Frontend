import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import Btn from "../Components/Button";
import Input from "../Components/Input";

export default function PoiScreen({ navigation, route }) {
  const [poiInfos, setPoiInfos] = useState({});
  const [newComment, setNewComment] = useState("");
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const horaires = poiInfos.horaires || [];
  const id = route.params.google_id;
  let poiArr = [];
  let poiObjet = {};

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/places/id/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.place) {
            poiObjet = {
              _id: data.place._id,
              image: data.place.image,
              nom: data.place.nom,
              adresse: data.place.adresse,
              horaires: data.place.horaires,
              description: data.place.description,
              categorie: data.place.categorie,
              location: data.place.location,
            };
            setPoiInfos(poiObjet);
          }
        });
    }
  }, [isFocused]);

  // const poiInfosVisuel = poiInfos.map((e) => {
  //   return (
  //     <View style={styles.titleContainer}>
  //       <Text style={styles.title}>{e.displayName.text}</Text>
  //       <TouchableOpacity onPress={hearthHandlePress}>
  //         <FontAwesome
  //           name="heart"
  //           style={[
  //             styles.heartIcon,
  //             { color: isFavorite ? "#FF0000" : "#FFFFFF" },
  //           ]}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // });

  // press sur croix pour retour à la map
  const handleClickCloseScreen = () => {
    navigation.navigate("TabNavigator", { screen: "Map" });
  };

  //press sur icône "heart" --> changement de couleur
  const [isFavorite, setIsFavorite] = useState(false);
  const hearthHandlePress = () => {
    setIsFavorite(!isFavorite);
  };

  //press sur icône "Like" --> changement de couleur + compteur de like
  const [isLiked, setIsLiked] = useState(false);
  const [likedCompt, setLikedCompt] = useState(14);
  const hearthLikePress = () => {
    if (!isLiked) {
      setLikedCompt(likedCompt + 1);
    } else {
      setLikedCompt(likedCompt - 1);
    }
    setIsLiked(!isLiked);
  };

  const handleClickGoToEvent = () => {
    navigation.navigate("Event", { nom: poiInfos.nom, image: poiInfos.image });
  };

  const handleClickGoToNewEvent = () => {
    navigation.navigate("NewEvent", {
      nom: poiInfos.nom,
      image: poiInfos.image,
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7DBA84" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={handleClickCloseScreen}
            style={styles.closeIcon}
          >
            <FontAwesome name="times" size={25} color="#FFF" />
          </TouchableOpacity>
          <Image
            source={{
              uri: poiInfos.image,
            }}
            style={styles.headerImage}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{poiInfos.nom}</Text>
            <TouchableOpacity onPress={hearthHandlePress}>
              <FontAwesome
                name="heart"
                style={[
                  styles.heartIcon,
                  { color: isFavorite ? "#FF0000" : "#FFFFFF" },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.corpModale}>
          <View style={styles.likeLine}>
            <View style={styles.likeZone}>
              <FontAwesome
                name="thumbs-up"
                size={25}
                style={[
                  styles.likedIcon,
                  { color: isLiked ? "#0074e0" : "#000000" },
                ]}
                onPress={hearthLikePress}
              />
              <Text style={styles.likeText}>{likedCompt}</Text>
            </View>
            <View>
              <Btn
                title="Evénement !"
                style={styles.eventButton}
                onPress={handleClickGoToEvent}
              />
            </View>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detail}>
            <Text style={styles.KeyText}>Adresse:</Text>
            <Text style={styles.infoText}>{poiInfos.adresse}</Text>
          </View>
          <View style={styles.HorairesModale}>
            <Text style={styles.horaires}>Horaires:</Text>
            <FontAwesome
              onPress={toggleModal}
              name="caret-down"
              size={25}
              color="#000"
            />
          </View>
          <View style={styles.DescriptionContainer}>
            <Text style={styles.KeyText}>Description:</Text>
            <Text style={styles.infoText}>{poiInfos.description}</Text>
          </View>

          {/* <Btn
            title="Itineraire vers ce lieu"
            style={styles.boutonItineraire}
          ></Btn> */}

          <Btn
            title="Créer un événement"
            style={styles.boutonItineraire}
            onPress={handleClickGoToNewEvent}
          ></Btn>

          <View style={styles.commentaireHeader}>
            <Text style={styles.KeyText}>Commentaires:</Text>
            <FontAwesome name="plus" style={styles.plusIcon} />
          </View>

          <View style={styles.ZoneCommentaire}>
            <View style={styles.commentaireContainer}>
              <View style={styles.commentTitle}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require("../assets/avatars/chien_1.png")}
                    style={styles.userAvatar}
                  />
                </View>
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentPseudo}>LULU</Text>
                  <Text>il y a 1h :</Text>
                </View>
              </View>
              <View style={styles.commentParent}>
                <Input
                  placeholder="nouveau commentaire"
                  style={styles.commentInput}
                />
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
                  <Text>il y a 2h :</Text>
                </View>
              </View>
              <View style={styles.commentParent}>
                <Text style={styles.commentText}>
                  Cras elementum ultrices diam. Maecenas ligula massa, varius a,
                  semper congue, euismod non, mi. Proin porttitor, orci nec
                  nonummy molestie, enim est eleifend mi, non fermentum diam
                  nisl sit amet erat. Duis semper.
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
                  <Text>il y a 3h :</Text>
                </View>
              </View>
              <View style={styles.commentParent}>
                <Text style={styles.commentText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor.
                </Text>
              </View>
            </View>

            <View style={styles.commentaireContainer}>
              <View style={styles.commentTitle}>
                {/* <Image
                  style={styles.userAvatar}
                  source={require("../assets/avatars/chien_25.png")}
                /> */}
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentPseudo}>BALOU</Text>
                  <Text>il y a 4h :</Text>
                </View>
              </View>
              <View style={styles.commentParent}>
                <Text style={styles.commentText}>
                  Cras elementum ultrices diam. Maecenas ligula massa, varius a,
                  semper congue, euismod non, mi. Proin porttitor, orci nec
                  nonummy molestie, enim est eleifend mi, non fermentum diam
                  nisl sit amet erat. Duis semper.
                </Text>
              </View>
            </View>

            <View style={styles.commentaireContainer}>
              <View style={styles.commentTitle}>
                <Image
                  style={styles.userAvatar}
                  source={require("../assets/avatars/chien_19.png")}
                />
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentPseudo}>NANA</Text>
                  <Text style={styles.commentTime}>il y a 4h30 :</Text>
                </View>
              </View>
              <View style={styles.commentParent}>
                <Text style={styles.commentText}>
                  commentaire ......commentaire ......commentaire
                  ......commentaire ......commentaire
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Horaires Complet</Text>
              <ScrollView>
                {horaires.length > 0 ? (
                  horaires.map((horaire, index) => (
                    <View key={index} style={styles.horaireItem}>
                      <Text style={styles.horaireText}>{horaire}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.horaireText}>
                    Aucun horaire disponible
                  </Text>
                )}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    color: "#416165",
    fontWeight: "bold",
  },
  eventButton: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    height: 30,
    width: 125,
    justifyContent: "center",
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 15,
    fontSize: "12",
    paddingVertical: 1,
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
    fontSize: 8,
    paddingHorizontal: 10,
    paddingVertical: 1,
    height: 30,
    width: 125,
    justifyContent: "center",
    marginRight: 15,
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
    zIndex: 3,
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
    textAlign: "justify",
    flexWrap: "nowrap",
    fontSize: 14,
    color: "#416165",
    paddingLeft: 10,
    paddingRight: 15,
  },

  KeyText: {
    flexWrap: "nowrap",
    fontSize: 16,
    fontWeight: "bold",
    color: "#416165",
    paddingLeft: 10,
    marginRight: 16,
  },

  infoText: {
    fontSize: 14,
    marginBottom: 1,
    color: "#666",
    paddingLeft: 10,
  },

  DescriptionContainer: {
    alignContent: "flex-start",
    marginBottom: 15,
    paddingLeft: 10,
    marginRight: 16,
  },

  descriptionText: {
    textAlign: "justify",
    flexWrap: "nowrap",
    fontSize: 14,
    color: "#416165",
    paddingLeft: 10,
    paddingRight: 15,
  },

  commentaireContainer: {
    marginbottom: 5,
  },

  commentaireHeader: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ZoneCommentaire: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom:30
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#7DBA84",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  HorairesModale: {
    flexDirection: "row",
    margin: 20,
  },
  horaires: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#416165",
    marginRight: 10,
  },
  horaireItem: {
    marginVertical: 5,
    padding: 4,
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  headerImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  heartIcon: {
    fontSize: 24,
    right: 2,
  },
  closeIcon: {
    padding: 10,
    position: "absolute",
    top: 1,
    right: 10,
    zIndex: 2,
  },
});

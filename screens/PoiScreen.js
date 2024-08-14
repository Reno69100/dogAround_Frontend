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
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import Btn from "../Components/Button";
import Input from "../Components/Input";
import TextContainer from "../Components/TextContainer";
import Correspondance from "../assets/avatars/Correspondance";
import { addFavorite, removeFavorite } from "../reducers/user";
import { importPlaces, updateLike } from "../reducers/places";

export default function PoiScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [poiInfos, setPoiInfos] = useState({});
  const [newComment, setNewComment] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likedCompt, setLikedCompt] = useState(14);

  const [showNewComment, setShowNewComment] = useState(false);

  const isFocused = useIsFocused();
  const id = route.params.google_id;
  let poiArr = [];
  let poiObjet = {};
  const now = new Date();

  const user = useSelector((state) => state.user.value);
  const places = useSelector((state) => state.places.value); //Recuperation des places dans le STORE
  const pseudo = user.pseudo;
  // console.log("user :", user.pseudo);
  // console.log("id :", id);
  // console.log(
  //   "places:",
  //   places.filter((element) => element.google_id === id)
  // );

  useEffect(() => {
    if (isFocused) {
      console.log('TEST')

      if (id) {
        // Fetch du détail du POI
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
    }
  }, [isFocused]);

  // press sur croix pour retour à la map
  const handleClickCloseScreen = () => {
    navigation.navigate("TabNavigator", { screen: "Map" });
  };

  //press sur icône "heart" --> changement de couleur

  function hearthHandlePress() {
    // const google_id = poiInfos.google_id
    //ajout d'un Place_ID dans le tableau favorites du user
    // 1 - vérification de l'existance du Place_ID dans la bdd
    // fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/place/id/${google_id}`)
    // .then((response) => response.json())
    // .then((placeData) => {
    //   const placeId = placeData._id
    // })
    // if(user.favorites)
    // setIsFavorite(!isFavorite);
    // const userFavorites = user.favorites
    // const idToAdd = JSON.stringify(id)
    if (!user.favorites.includes(id)) {
      console.log("true");
      dispatch(addFavorite(id));
      setIsFavorite(true);
    } else {
      console.log("false");
      dispatch(removeFavorite(id));
      setIsFavorite(false);
    }
  }

  //press sur icône "Like" --> changement de couleur + maj de likes dans le store
  function likePress() {
    dispatch(updateLike({ pseudo: pseudo, id: id }));
  }

  // const hearthLikePress = () => {
  //   if (!isLiked) {
  //     setLikedCompt(likedCompt + 1);
  //   } else {
  //     setLikedCompt(likedCompt - 1);
  //   }
  //   setIsLiked(!isLiked);
  //  }
  // };

  //press sur + pour newComment
  const handlePressNewComment = () => {
    setShowNewComment(!showNewComment);
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
              <TouchableOpacity onPress={likePress}>
                <FontAwesome
                  name="thumbs-o-up"
                  size={25}
                  style={[
                    styles.likedIcon,
                    { color: isLiked ? "#FF0000" : "#000000" },
                  ]}
                />
              </TouchableOpacity>
              <Text style={styles.likeText}>{likedCompt}</Text>
            </View>
            <View style={styles.btnContainer}>
              <Btn title="Evénement !" style={styles.eventButton} />
            </View>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detail}>
            <Text style={styles.KeyText}>Adresse:</Text>
            <Text style={styles.infoText}>{poiInfos.adresse}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.KeyText}>Horaires:</Text>
            <Text style={styles.infoText}>{poiInfos.horaires}</Text>
          </View>

          <View style={styles.DescriptionContainer}>
            <Text style={styles.descriptionText}>
              <Text style={styles.KeyText}>Description : </Text>
              {poiInfos.description}
            </Text>
          </View>

          {/* <Btn
            title="Itineraire vers ce lieu"
            style={styles.boutonItineraire}
          ></Btn> */}

          <Btn title="Créer un événement" style={styles.boutonItineraire}></Btn>

          <View style={styles.commentaireHeader}>
            <Text style={styles.KeyText}>Commentaires:</Text>
            <FontAwesome name="plus" style={styles.plusIcon} />
          </View>

          <View style={styles.ZoneCommentaire}>
            <View style={styles.newCommentContainer}>
              <View style={styles.commentaireContainer}>
                <View style={styles.commentTitle}>
                  <View style={styles.avatarContainer}>
                    <Image source={user.avatar} style={styles.userAvatar} />
                  </View>
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.commentPseudo}>{user.pseudo}</Text>
                    <Text style={styles.commentTime}>xxx</Text>
                  </View>
                </View>
                <View style={styles.commentTextContainer}>
                  <Input
                    placeholder="nouveau commentaire"
                    style={styles.commentInput}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <Btn title="Commenter" style={styles.commentButton} />
                </View>
              </View>
            </View>

            <View style={styles.commentaireContainer}>
              <View style={styles.commentTitle}>
                <Image
                  source={require("../assets/avatars/chien_1.png")}
                  style={styles.userAvatar}
                />
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentPseudo}>MOMO</Text>
                  <Text style={styles.commentTime}>il y a 2h :</Text>
                </View>
              </View>
              <View style={styles.commentTextContainer}>
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
                  <Text style={styles.commentTime}>il y a 3h :</Text>
                </View>
              </View>
              <View style={styles.commentTextContainer}>
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
                  <Text style={styles.commentTime}>il y a 4h :</Text>
                </View>
              </View>
              <View style={styles.commentTextContainer}>
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
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>
                  commentaire ......commentaire ......commentaire
                  ......commentaire ......commentaire
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  likedIcon: {
    zIndex: 10,
  },

  container: {
    paddingtop: 15,
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
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
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
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    right: 10,
    fontSize: 24,
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
    color: "#416165",
    fontWeight: "bold",
  },

  eventButton: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    height: 25,
    width: 125,
    justifyContent: "center",
    marginVertical: 5,
    marginLeft: 20,
    marginRight: 15,
    fontSize: "12",
    paddingVertical: 1,
  },

  commentButton: {
    width: "90%",
    height: 30,
    marginBottom: 15,
    alignItems: "center",
    marginLeft: 20,
    fontSize: "12",
    paddingVertical: 1,
  },

  boutonItineraire: {
    width: "90%",
    height: 30,
    marginBottom: 5,
    alignItems: "center",
    marginLeft: 20,
    fontSize: "12",
    paddingVertical: 1,
  },

  eventButton: {
    fontSize: 8,
    paddingHorizontal: 10,
    paddingVertical: 1,
    height: 25,
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
    flexDirection: "row",
    alignItems: "baseline",
  },

  KeyText: {
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

  DescriptionContainer: {
    alignContent: "flex-start",
    marginBottom: 15,
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
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
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

  commentTextContainer: {
    flexWrap: "nowrap",
    alignItems: "flex-start",
    marginLeft: 30,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
});

import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Btn from '../Components/Button'
import Input from '../Components/Input'

export default function PoiScreen({navigation}) {

    const handleClickCloseScreen = () => {
        navigation.navigate("TabNavigator", { screen: "Map" });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleClickCloseScreen} style={styles.closeIcon}>
                    <FontAwesome
                        name="times"
                        size={25}
                        color="#FFF"
                    />
                </TouchableOpacity>
                <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipO3NhYksSKZecYUztsgOASA9WehHxchCJg0nSaX=w408-h240-k-no-pi-0-ya144.16565-ro-0-fo100' }} style={styles.headerImage} />
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
                    <Btn title="EVENT" style={styles.eventButton} />
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

                    <Text style={styles.detailText}>Description:</Text>
                    <ScrollView style={styles.scrollDescription}>
                    <View style={styles.scrollCommentaire}>
                        <Text style={styles.commentText}> commentaire ......commentaire ......commentaire ......commentaire ......commentaire  </Text>
                    </View>
                    </ScrollView>

                    <View style={styles.commentaireContainer}>
                        <View style={styles.commentaireHeader}>
                            <Text style={styles.detailText}>Commentaires:</Text>
                            <FontAwesome name="plus" style={styles.plusIcon} />
                        </View>
                        <ScrollView style={styles.scrollCommentaire}>
                            <View style={styles.comment}>
                                <Image style={styles.userAvatar} source={require('../assets/avatars/chien_1.png')}/>
                                <View style={styles.commentTextContainer}>
                                        <Text style={styles.commentPseudo}>PSEUDO</Text>
                                        <Text style={styles.commentTime}>il y a 1h</Text>
                                </View>
                            </View>
                            <View style={styles.commentParent}>
                                <Text style={styles.commentText}> commentaire ......commentaire ......commentaire ......commentaire ......commentaire  </Text>
                            </View>
                        </ScrollView>
                    </View>
             </View>
             <View style={styles.btnContainer} >
                <Btn title='ITINERAIRE' style={styles.bouton} ></Btn>
                <Btn title='CREER UN EVENEMENT' style={styles.bouton} ></Btn>
            </View>

         </View>
     );
}

const styles = StyleSheet.create({

    container: { height: "100%", 
        width: "100%", flex: 1, 
        flexDirection: "column", 
        justifyContent: 'flex-start', 
        backgroundColor: "#E8E9ED",
     }, 

    headerContainer: {
        marginTop: 30,
        position: 'relative',
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    headerImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },

    title: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },

    heartIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 24,
        color: '#fff',
        marginRight: 8,
    },

    closeIcon: {
        padding: 10,
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 10,
    },

    corpModale: {
        marginTop: 20,
    },

    likeLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    likeZone: {
        flexDirection: 'row',
        alignItems: 'flex-end', 
    },

    likeText: {
        marginLeft: 8, 
        fontSize: 16,
    },

    eventButton:{
        paddingVertical:5,
        height: 40,
        width:120,
    },

    detailContainer: {
        paddingHorizontal: 16,
        borderRadius: 10,
        margin: 16,
    },

    plusIcon : {
        fontSize: 25,
        color: '#666',
        marginRight: 8,
    },

    detail : {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'baseline',
    },

    detailText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        paddingLeft: 10,
        marginRight: 16,
    },

    infoText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#666',
    },

    scrollDescription: {
        maxHeight: 100, // Limite la hauteur du ScrollView pour éviter de prendre tout l'écran
        width:'100%',
        marginBottom: 15,
       },

    descriptionText: {
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'top', // Assure que le texte commence en haut du champ
    },

    commentaireHeader:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },

    scrollCommentaire:{
        backgroundColor: '#FFF',
        borderRadius: 8,
        maxHeight: 200, // Limite la hauteur du ScrollView pour éviter de prendre tout l'écran
        padding: 8,
    },

    userAvatar:{
        height: 30,
        width: 30,
    },

    comment:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        paddingHorizontal: 16,
    },

    commentTextContainer:{
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    commentPseudo:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        paddingLeft: 10,
        paddingRight: 10,
    },

    commentText:{
        alignItems: 'center',
        fontSize: 14,
        color: '#333',
        paddingLeft: 10,
        paddingRight: 10,
    },

    commentParent:{
        flexWrap: 'nowrap',
        alignItems:'flex-start',
        marginLeft: 30,
        marginBottom: 10,
        paddingHorizontal: 16,
    },

    btnContainer: {
        flexDirection: 'column',
        paddingHorizontal: 16,  // Ensure padding matches the ScrollView padding
        width: '100%',  // Make the container take the full width of the parent View
        marginBottom: 20,  // Add some margin at the bottom if needed
    },
    bouton: {
        width: '90%',  
        height: 50,  
        marginVertical: 5,  
        alignItems: 'center',
        marginLeft: 20,
    }, 
});

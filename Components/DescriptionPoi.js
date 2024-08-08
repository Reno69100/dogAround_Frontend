import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Btn } from './Button'

export default function descriptionPoi() {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.headerImage}
                        source={{ uri: 'https://photos.app.goo.gl/ywt3xerg7wjnmjZZ9' }}
                    />
                    <FontAwesome name="times-circle" style={styles.closeIcon} />
                </View>
                <Text style={styles.title}>PARC DE LA LOUVIERE</Text>
                <FontAwesome name="heart" style={styles.heartIcon} />
            </View>
           {/*  <View style={styles.corpModale}>
                <View style={styles.btnCorp}>
                    <FontAwesome name="thumbs-o-up" style={styles.likeIcon} />
                    <Text style={styles.likeText}>630</Text>
                    <Btn title="EVENT" style={styles.eventButton} />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Adresse:</Text>
                    <Text style={styles.infoText}>2 rue la louviere</Text>
                    <Text style={styles.detailText}>Horaires:</Text>
                    <Text style={styles.infoText}>06H - 23H</Text>
                    <Text style={styles.detailText}>Description:</Text>
                    <ScrollView style={styles.scrollDescription}>
                        <TextInput
                            multiline={true}
                            style={styles.descriptionText}
                            placeholder="Description du lieu..."
                        />
                    </ScrollView>
                    <View style={styles.commentaireContainer}>
                        <Text style={styles.detailText}>Commentaires:</Text>
                        <FontAwesome name="plus" style={styles.plusIcon} />
                        <ScrollView style={styles.scrollCommentaire}>
                            <View style={styles.comment}>
                                <Image
                                    style={styles.userAvatar}
                                    source={uri='https://res.cloudinary.com/ddn1jozka/image/upload/v1722959254/chien_1_p84yee.png' }
                                />
                                <View style={styles.commentTextContainer}>
                                    <Text style={styles.commentPseudo}>PSEUDO</Text>
                                    <Text style={styles.commentTime}>il y a 1h</Text>
                                    <Text style={styles.commentText}>
                                        commentaire ......
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <Btn title="ITINERAIRE" style={styles.btnItineraire} />
                    <Btn title="CREER UN EVENEMENT" style={styles.bntEvenement} />
                </View>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerContainer: {
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 24,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    heartIcon: {
        fontSize: 24,
        color: '#ff0000',
    },
    corpModale: {
        marginTop: 16,
    },
    btnCorp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    likeIcon: {
        fontSize: 24,
        color: '#000',
    },
    likeText: {
        fontSize: 18,
        marginLeft: 8,
    },
    eventButton: {
        backgroundColor: '#90EE90',
        padding: 8,
        borderRadius: 4,
    },
    detailContainer: {
        marginBottom: 16,
    },
    detailText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
    },
    scrollDescription: {
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
    },
    descriptionText: {
        height: '100%',
        textAlignVertical: 'top',
    },
    commentaireContainer: {
        marginVertical: 8,
    },
    plusIcon: {
        fontSize: 24,
        color: '#000',
        alignSelf: 'flex-end',
    },
    scrollCommentaire: {
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
    },
    comment: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    commentTextContainer: {
        flex: 1,
    },
    commentPseudo: {
        fontWeight: 'bold',
    },
    commentTime: {
        color: '#999',
    },
    commentText: {
        marginTop: 4,
    },
    btnItineraire: {
        backgroundColor: '#90EE90',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 4,
    },
    bntEvenement: {
        backgroundColor: '#90EE90',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 4,
    },
});


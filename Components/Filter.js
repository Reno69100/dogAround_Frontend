import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

import Btn from "../Components/Button"

import { useDispatch } from 'react-redux';
import { storeFilters, storeCity } from '../reducers/user'

export default function Filter({ userInfo, validFilters }) {
  const dispatch = useDispatch();
  const [city, setCity] = useState(userInfo.city); //Etat champ Ville
  const [filters, setFilters] = useState(userInfo.filtres); //Etat filtres sélectionnés
  const [optionCity, setOptionCity] = useState(userInfo.city); //Sélection Ma position/Ville

  //Fonction sélection filtres
  const selectFilter = (filter) => {
    const newDataFilters = filters.filter(e => e !== filter);

    if (newDataFilters.length < filters.length) {
      //Retire le filtre
      setFilters(newDataFilters);
    }
    else {
      //Ajout nouveau filtre
      setFilters([...filters, filter]);
    }
  }

  //Confirmation filtres
  const confirmation = () => {
    dispatch(storeFilters(filters));
    if (optionCity) {
      dispatch(storeCity(city));
    }
    else {
      dispatch(storeCity(''));
    }
    validFilters();
  }

return (
  <View style={styles.container}>
    <Text style={styles.title}>Filtres</Text>
    <View style={styles.selection}>
      <TextInput
        style={styles.cityInput}
        placeholder="Ville"
        accessibilityLabel="City Input"
        value={city}
        onChangeText={setCity}
        editable={optionCity}
      />
      <TouchableOpacity style={styles.button} onPress={() => setOptionCity(!optionCity)}>
        {!optionCity && <Text style={styles.buttontext}>Ma Position</Text>}
        {optionCity && <Text style={styles.buttontext}>Ville</Text>}
      </TouchableOpacity>
    </View>
    <View style={styles.containerfilters}>
      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'parc')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('parc')}
        />
        <Text style={styles.text}>Parcs et forêts</Text>

      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'air')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('air')}
        />
        <Text style={styles.text}>Air canine</Text>

      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'veterinaire')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('veterinaire')}
        />
        <Text style={styles.text}>Veterinaire</Text>

      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'animalerie')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('animalerie')}
        />
        <Text style={styles.text}>Animalerie</Text>

      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'eau')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('eau')}
        />
        <Text style={styles.text}>Point d'eau</Text>
      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'restaurant')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('restaurant')}
        />
        <Text style={styles.text}>Bar/Restaurant</Text>
      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'favori')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('favori')}
        />
        <Text style={styles.text}>Favoris</Text>
      </View>

      <View style={styles.row}>
        <FontAwesome name='paw'
          size={40}
          style={{ marginRight: 15, color: (filters.some(e => e === 'autre')) ? '#D9D9D9' : '#416165' }}
          onPress={() => selectFilter('autre')}
        />
        <Text style={styles.text}>Autres</Text>
      </View>
    </View>
    <Btn title="Confirmer" onPress={() => confirmation()}/>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
  },

  containerfilters: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '100%',
  },

  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  title: {
    fontFamily: "Poppins_600Regular",
    fontSize: 20,
    color: '#416165',
    padding: 10,
  },

  text: {
    fontFamily: "Poppins_600Regular",
    fontSize: 20,
    color: '#416165'
  },

  cityInput: {
    width: '50%',
    borderWidth: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  button: {
    backgroundColor: '#BB7E5D',
    padding: 11,
    width: '50%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttontext: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },

  // text:{
  //   color: '#416165'
  // }
})

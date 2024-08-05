import React from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faDirections, faPaw } from "@fortawesome/free-solid-svg-icons";


import { text } from "@fortawesome/fontawesome-svg-core";

  export default function Filter() {
    let filterClick = false;
    let color;
    let iconName= '';

    const filterArr = ['MA POSITION', 'PARCS ET FORÊT', 'AIR CANINE', 'VETERINAIRE', 'ANIMALERIE', "POINT D'EAU", 'BAR/RESTAURANT', 'FAVORIS', 'AUTRES']

   

    const handleIcon = () => {
        if(filterClick){
            return filterClick = false
        } else {
            return filterClick = true
        }
    }

    if(filterClick){
        color = '#7DBA84'
    } else {
        color = '#416165'
    }

    const filters = filterArr.map((data, i) => {
      iconName = 'paw'
      return (
         <View style={styles.container}>
         <FontAwesome  name= {iconName}
              style = {{marginRight:'5%', color : color}}
              onPress = {() => handleIcon()}
             /> 
       <Text style={{color : '#416165'}} >{data}</Text>
       </View>
      )
             
   })
    
    
    return(
        <View style={styles.mainContainer}>
          {filters}
            

            
        </View>
    )
  }

  const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',

      height: '50%'

    },

    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    // text:{
    //   color: '#416165'
    // }
  })

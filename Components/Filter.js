import React from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


  export default function Filter() {
    let filterColor = false;
    let color = '#7DBA84';
    let iconName= 'paw';
   

    const handleIcon = (filterColor) => {
      filterColor ? color = '#416165' : color = '#7DBA84' 
        if(filterColor){
            filterColor = false
        } else {
            filterColor = true
        }
    }

    if(filterColor){
        return  color = '#7DBA84'
    } else {
        color = '#416165'
    }
    console.log(filterColor)
    
    return(
        <View style={styles.mainContainer}>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >MA POSITION</Text>

          </TouchableOpacity>
            
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >PARCS ET FORÊT</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >AIR CANINE</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >VETERINAIRE</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >ANIMALERIE</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >POINT D'EAU</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >BAR/RESTAURANT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >FAVORIS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <FontAwesome  name= {iconName}
               style = {{marginRight:'5%', color : color}}
               onPress = {() => handleIcon()}
            /> 
            <Text style={{color : '#416165'}} >AUTRES</Text>
          </TouchableOpacity>

            
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

import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image,  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import like from '../images/like.png'
import dislike from '../images/dislike.png'
import api from '../services/api'
import { useScreens } from 'react-native-screens';

// import { Container } from './styles';

const HomePage = ({route}) => {
   
   const {user} = route.params;
   const [players, setPlayers] = useState([]);

   useEffect(()=>{
      async function loadPlayers(){
         const response = await api.get('/players', {
            headers:{
               user
            }
         })
         setPlayers(response.data);
      }
     loadPlayers(); 
   },[user])
   
  return (
   <>
   <SafeAreaView style={styles.container}>
      <View style={styles.cardsContainer}>
         {players.map((user, index) =>(
         <View key={user._id} style = {[styles.card, {zIndex: players.length - index}]} >
            <Image style={styles.img} source= {{uri: user.avatar}}/>
            <View style={styles.nameContainer}>
         <Text style={styles.name}>{user.name}</Text>
               <Text style={styles.level}>Level: {user.level}</Text>
            </View>
            <Image style={styles.elo} source= {{uri: user.rankingElo}}/>
         </View>)
         )}
      </View>
      <View style={styles.buttonsContainer}>
         <TouchableOpacity style={styles.button}>
            <Image source={like}></Image>            
         </TouchableOpacity>
         <TouchableOpacity style={styles.button}>
            <Image source={dislike}></Image>            
         </TouchableOpacity>
      </View>
   </SafeAreaView>
   </>
  )
}

const styles = StyleSheet.create({
   container:{
      backgroundColor: "#f3f3f3",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",      
   },
   img:{
      flex: 1,     
      width: 380,      
      alignItems: 'center',
   },
   elo:{
      width: 80,
      height: 80,      
      alignItems: 'center',
      marginBottom: 15,
   },
   cardsContainer:{
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      maxHeight: 600,
      
      
   },
   card: {
      borderWidth:1,
      borderColor: "#DDD",
      borderRadius: 8,
      margin: 30,
      overflow: 'hidden',
      alignItems: "center",
      position: 'absolute',
      backgroundColor: "#fff",
      top:0,
      left:0,
      right:0,
      bottom:0      
   },
   nameContainer: {
      backgroundColor: "#343A40",
      borderWidth:1,
      borderRadius: 5,
      marginTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 15,
   },
   name: {
      fontSize: 22,
      color: '#fff',
      fontWeight: "500", 
      alignSelf: "center",
      marginBottom: 4,   
   },
   level: {
      fontSize: 22,
      color: '#fff',
      fontWeight: "500",
   },
   buttonsContainer:{
      flexDirection: "row",
      marginBottom: 30,      
   },
   button:{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#FFF",
      justifyContent: 'center',
      alignItems: "center",
      marginHorizontal: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 2,
      shadowOffset:{
         width:0,
         height: 2,
      }
   }
})

export default HomePage;
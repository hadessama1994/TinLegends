import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image,  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import like from '../images/like.png'
import dislike from '../images/dislike.png'
import api from '../services/api'
import Toast from 'react-native-toast-message'

// import { Container } from './styles';

const HomePage = ({route}) => {
   
   const {user} = route.params;
   const [players, setPlayers] = useState([]);

   async function handleLike(id){
      Toast.show({
         text1: 'VOCÊ CURTIU ESSA PESSOA',         
         visibilityTime: 2000,
         autoHide: true,  
       })
      await api.post(`/players/${id}/likes`, null, {
         headers: {user}
      }) 
      loadPlayers();       
   }

   async function handleDislike(id){
      Toast.show({
         type: 'error',
         text1: 'VOCÊ RECUSOU ESSA PESSOA',         
         visibilityTime: 2000,
         autoHide: true,  
       })
      await api.post(`/players/${id}/dislikes`, null, {
         headers: {user}
      }) 
      loadPlayers();       
   }

   async function loadPlayers(){
      const response = await api.get('/players', {
         headers:{
            user
         }
      })
      setPlayers(response.data);
   }

   useEffect(()=>{      
     loadPlayers(); 
   },[user])
   
  return (
   <>
   
   <SafeAreaView style={styles.container}>
   <Toast ref={(ref) => Toast.setRef(ref)} />  
      
   {players.length == 0 ? <Text style={{fontSize: 25}}>No mores players to see.</Text> : (players.map((user, index) =>(   
      <> 
      <View style={styles.cardsContainer}> 
         <View key={user._id} style = {[styles.card, {zIndex: players.length - index}]} >
            <Image style={styles.img} source= {{uri: user.avatar}}/>
            <View style={styles.nameContainer}>
               <Text style={styles.name}>{user.name}</Text>
               <Text style={styles.level}>Level: {user.level}</Text>
            </View>
            <Image style={styles.elo} source= {{uri: user.rankingElo}}/>
            </View>            
      </View>
      <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={()=>{handleLike(user._id)}} style={styles.button}>
               <Image source={like}></Image>            
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleDislike(user._id)}} style={styles.button}>
               <Image source={dislike}></Image>            
            </TouchableOpacity>
         </View>
       </> 
      )))}
      
            
      
     
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
      width: 380,
      height: 360,
      
   },
   elo:{
      marginTop: 10,
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
      position: 'absolute',      
      left:0,
      right:0,       
      
   },
   card: {
      borderWidth:1,
      borderColor: "#DDD",
      borderRadius: 8,      
      margin: 30,
      overflow: 'hidden',
      alignItems: "center",     
      backgroundColor: "#fff",
          
   },
   nameContainer: {
      position: 'absolute',
      backgroundColor: "#343A40",
      borderWidth:1,
      borderRadius: 5,
      flexDirection:'column',
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 15,
      alignItems: 'flex-end'
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
      overflow: 'hidden',
      position: 'absolute', 
      
   },
   button:{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#FFF",
      justifyContent: 'center',
      alignItems: "center",      
      marginHorizontal: 120,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 2,
      shadowOffset:{
         width:0,
         height: 2,
      },
      marginTop: 200
   }
})

export default HomePage;
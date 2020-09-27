import React, {useEffect, useState} from 'react';
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Text, ActivityIndicator, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import api from '../services/api'



const DismissKeyboardEverywhere = ({children})=> {
   return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      {children}
      </TouchableWithoutFeedback>
   )}

const HomeLogin = ({ navigation }) => {   
   const [user, setUser] = useState ('');
   const [isLoading, setLoading] = useState(false);   
   
  async function handleLogin(){
   setLoading(true);
   try {
      const response = await api.post('/players', {
         username: user,
       });
      const {_id} = response.data;
      
      navigation.navigate('TinLegends', {user: _id}); 
      setLoading(false);
   } catch (error) {
      setLoading(false);
   }
   
     
        
   }
  return (
     <DismissKeyboardEverywhere>
         {isLoading ? <ActivityIndicator style={styles.container} size="large" color="#ffc109" /> : (
      <KeyboardAvoidingView       
         style={styles.container} 
         behavior="padding"
         enabled={Platform.OS="ios"}>
         <Image style={styles.img} source = {{uri: 'https://i.imgur.com/Nk12wEK.png'}}/>
         <TextInput 
            autoCorrect={false}         
            autoCapitalize="none" 
            placeholderTextColor="#999" 
            placeholder="Nickname" 
            style={styles.input}
            value={user}
            onChangeText={setUser}>           
         </TextInput>
         <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
               <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>            
      </KeyboardAvoidingView>
      )}
      
     </DismissKeyboardEverywhere>
  )
}

const styles  = StyleSheet.create({
   container:{
      backgroundColor: "#f3f3f3",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 30,
   },
   img:{
      width: 350,
      height: 150,
   },
   input:{
      height: 56,
      alignSelf: "stretch",
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
      marginTop: 10,
      paddingHorizontal: 15,

   },
   button:{
      backgroundColor: "#FFC107",
      height: 46,
      alignSelf: "stretch",
      borderRadius: 4,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center"
   },
   buttonText:{
      fontSize: 18,
      fontWeight: "400",
      

   },
})

export default HomeLogin;
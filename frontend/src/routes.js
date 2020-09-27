import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import HomeLogin from './Components/HomeLogin'
import HomePage from './Components/HomePage'

export default function Routes(){
   return (
   <BrowserRouter>
      <Route path="/" exact component = {HomeLogin}/>
      <Route path="/main/:id" component = {HomePage}/>
   </BrowserRouter>
   )
}
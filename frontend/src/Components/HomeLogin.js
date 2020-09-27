import React, { useState } from 'react';
import { Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import api from '../services/api'
import {PromiseLoader} from './PromiseLoader';
import { trackPromise} from 'react-promise-tracker';
import Footer from './Footer'

// import { Container } from './styles';

function HomeLogin({history}) {

   const [username, setUsername] = useState('');
   
   async function playerLogin(){
    const response = await api.post('/players', {
      username
    })    
    const {_id} = response.data;
    history.push(`/main/${_id}`)
   }
   
   async function handleSubmit(e){
      e.preventDefault(); 
      trackPromise(playerLogin()); 
   }
   
   
  return (
  <>
    <div className="flex-row d-flex justify-content-center">
     <div className="mx-auto"> 
     
       <Row>
         <Col>
           <img style={{height: 250}} alt="logo" src="https://i.imgur.com/Nk12wEK.png" />
           <Form onSubmit={handleSubmit}>
            <Form.Control             
            type="text" 
            placeholder="Nickname"
            value = {username}
            onChange={e => setUsername(e.target.value)}/>
            <Button type="submit" className="btn btn-warning btn-block mt-1">Entrar </Button> 
            <PromiseLoader />
            </Form>
         </Col>
       </Row>
      </div>        
   </div> 
 </>)
}

export default HomeLogin;
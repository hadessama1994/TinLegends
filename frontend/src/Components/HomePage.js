import React, {useEffect, useState} from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Home.css'
import api from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';


// import { Container } from './styles';



function HomePage({ match }) {
   const [users, setUser] = useState([]);
   

   async function handleLike (id) {
      toast.warn('Você curtiu essa pessoa!');
      await api.post(`/players/${id}/likes`, null, {
         headers: {user: match.params.id}
      }) 
      loadUsers();  
   }
   async function handleDislike(id) { 
      toast.error('Você evitou essa pessoa!');
      await api.post(`/players/${id}/dislikes`, null, {
         headers: {user: match.params.id}
      }) 
      loadUsers();
   }

   async function loadUsers(){
      const response = await api.get('/players', {
         headers: {
            user: match.params.id
         }
      })
      setUser(response.data);
   }  
  
   useEffect(()=>{             
      loadUsers();      
   },[loadUsers, match.params.id]);

   

   

return (<>
 
   <div className="d-flex flex-row justify-content-center"><img style={{height: 250}} alt="logo" src="https://i.imgur.com/Nk12wEK.png" />
   </div>
 
 <div className="d-flex flex-row bd-highlight mb-3 justify-content-center flex-wrap">
   {users.map (user =>        
      <div className="p-2 bd-highlight">          
         <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
               <div className="d-flex flex-column align-items-center bg-dark rounded text-light mb-1 pb-2 pt-2">
                  <Card.Title>
                  {user.name}
                  </Card.Title>           
                  <Card.Subtitle> Level: {user.level} </Card.Subtitle>
               </div> 
            <Card.Text>             
               <div className="d-flex justify-content-center">
                  <img src={user.rankingElo} alt="elo" width='100px' height='110px'/>
               </div> 
            </Card.Text>
               <div className="d-flex justify-content-around">
                  <Button onClick={() => handleLike(user._id)} variant="link" className="buttons" ><FontAwesomeIcon size='2x' color='red' icon={faHeart} /></Button>
                  <Button onClick={() => handleDislike(user._id)} variant="link" className="buttons"><FontAwesomeIcon size='2x' color='green' icon={faTimes} /></Button>
               </div>
            </Card.Body>
         </Card>
   </div>      
   )}   
   <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
   />
  </div>
  <Footer/>

   </>);
}

export default HomePage;
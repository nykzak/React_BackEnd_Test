import React, {Component} from 'react';
import './app.css';
import styled from 'styled-components';
import AppHeader from '../app-header';
import Form from '../form';
import axios from 'axios';
import ThanksSection from '../thanks-Section';
import Loading from '../loading';



const AppBlock = styled.div`
  margin:0 auto;
  max-width:800px;
`;

export default class App extends Component {

  state = {
     data:[],
     thanksMessage: false,
     loading:false
  }
 
  addItem =(body) => {
      axios.post('http://0.0.0.0:8000/api/onboarding',{
        first_name:body.name,
        last_name:body.lastname,
        password:body.password,
        notificationsProject_finish:body.notificationsProject_finish,
        notificationsUpdates:body.notificationsUpdates
      }).then(this.setState(({thanksMessage:true,loading:true})))
        .then(setTimeout(() =>{
        //window.location.reload()
        this.setState(({thanksMessage:false,loading:false}))
        },3000))
        
  }

  

  
  render(){
    
  
    return(
      <AppBlock>
      <AppHeader/>
       <Form onAdd={this.addItem}/>
       {this.state.thanksMessage ? <ThanksSection/> : null}
       {this.state.loading? <Loading/> :null }
      </AppBlock>
    )


  }
}





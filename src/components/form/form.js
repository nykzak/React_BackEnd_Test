import React, {Component} from 'react';


export default class Form extends Component {
    
        state={
            name:'',
            lastname:'',
            password:'',
            notificationsProject_finish:true,
            notificationsUpdates:true
            
        };
    
       


    changeHandler =(e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    

    onSubmit=(e) =>{
        const items = this.state;
        e.preventDefault();
        this.props.onAdd(items);
        this.setState({
            name:'',
            lastname:'',
            password:''
        });
     
    }




render() {
    const {name,lastname,password} = this.state

    
    
    return( 
        <div className="bg-gray-300 max-w-xs mb-0 mt-0 mr-auto ml-auto ">
             <h1 className="text-center mb-4">Please send us your information</h1>
        <form className="space-y-4" onSubmit={this.onSubmit}>
            <input 
            name='name' 
            required 
            placeholder="First name" 
            type="text"
            className="max-w-xs block  mr-auto ml-auto text-center rounded "
            value={name}
            onChange = {this.changeHandler}
            />
            <input 
            name='lastname' 
            required 
            placeholder="Last name" 
            type="text"
            className="max-w-xs block  mr-auto ml-auto text-center rounded "
            value={lastname}
            onChange = {this.changeHandler}
            />
            <input 
            name='password' 
            required 
            placeholder="Password" 
            type="password"
            className="max-w-xs block mr-auto ml-auto text-center rounded "
            value={password}
            onChange = {this.changeHandler}
            />
            <button 
            type="submit"
            className="block  mr-auto ml-auto w-full text-center bg-red-400 rounded "
            >Send</button>
          
        </form>
        </div>
       
    )
}
    
}
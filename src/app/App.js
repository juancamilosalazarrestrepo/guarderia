import React, {Component,useState} from "react";
import persona from "../models/persona";




class App extends Component {

   constructor() {
       super();
       this.state = {
           title:'',
           description: '',
           raza:'',
           comportamiento:'',
           nacimiento:'',
           vacunas:'',
           propietario:'',
           tasks:[],
           nombrep:'',
           email:'',
           direccion:'',
           telefono:'',
           cedula:'',
           personas:[],
           _id: ''
          
       }
        
       this.handleChange = this.handleChange.bind(this);
       this.handleChangep = this.handleChangep.bind(this);
       this.addTask = this.addTask.bind(this);
       this.addPersona = this.addPersona.bind(this);
   }

   /* metodos para agregar personas */
   addPersona(e){
         alert("dd");
         console.log(this.state);
         
        fetch('/api/personas',{
            method:'POST',
            body: JSON.stringify(this.statep),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
   
        .then(data => {
            
            M.toast({html:'Propietario Guardado'});
            this.setState({nombrep: '', email: '',direccion:'',telefono:'', cedula:'',});
            this.fetchPersonas();
        })
        .catch(err => console.error(err));

       
       e.preventDefault();
   }

   fetchPersonas(){
    fetch('/api/personas')
    .then(res  => res.json())
    .then(data =>{
     
     this.statep.personas=({personas: data });
     console.log(this.statep.personas); 
    } 
     ); 
}

deletePersona(id){
    
    if(confirm('estas seguro?')){
     fetch(`/api/personas/${id}`,{
         method:'DELETE',
         
         headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
      }    
    })
    
    
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        console.log(id);
        M.toast({html:'propietario eliminada'});
        this.fetchPersonas();
    });
}
}

editPersona(id){
    fetch(`/api/personas/${id}`)
    .then(res =>res.json())
    .then(data => {
        this.setState({
            nombrep: data.nombrep,
            email: data.email,
            direccion: data.direccion,
            telefono:data.telefono,
            cedula:data.cedula,
            _id: data._id
        })
    });
     
}

  /*  metodos para agregar mascotas */
   addTask(e){
       
       console.log(this.state);
       
       
       if(this.state._id){
           fetch(`/api/tasks/${this.state._id}`,{
               
               method:'PUT',
               body: JSON.stringify(this.state),
               headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
           })
           .then(res => res.json())
           .then(data => {
               
               console.log(data);
               M.toast({html:'actualizado'});
               this.setState({title:'',description:'',_id:'',raza:'',comportamiento:'',nacimiento:'',vacunas:'',propietario:'', email: '',direccion:'',telefono:'', cedula:''});
               this.fetchTasks();
           });


       }else{
        fetch('/api/tasks',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
   
        .then(data => {
            console.log(data);
            M.toast({html:'Propietario Guardado'});
            this.setState({title: '', description: '',raza:'',comportamiento:'', nacimiento:'', vacunas:'',propietario:''});
            this.fetchTasks();
        })
        .catch(err => console.error(err));
       }
        
       e.preventDefault();
   }

   componentDidMount(){
      this.fetchTasks();
     /*  this.fetchPersonas(); */
      
   }

   fetchTasks(){
       fetch('/api/tasks')
       .then(res  => res.json())
       .then(data =>{
        
        this.setState({tasks: data });
        console.log(this.state.tasks); 
       } 
        ); 
   }


   deleteTask(id){
       if(confirm('estas seguro?')){
        fetch(`/api/tasks/${id}`,{
            method:'DELETE',
            
            headers: {
             'Accept':'application/json',
             'Content-Type':'application/json'
         }    
       })
       
       
       .then(res => res.json())
       .then(data=>{
           console.log(data);
           console.log(id);
           M.toast({html:'tarea eliminada'});
           this.fetchTasks();
       });
   }
}

editTask(id){
    fetch(`/api/tasks/${id}`)
    .then(res =>res.json())
    .then(data => {
        this.setState({
            title: data.title,
            description: data.description,
            raza: data.raza,
            comportamiento:data.comportamiento,
            nacimiento:data.nacimiento,
            vacunas: data.vacunas,
            propietario: data.propietario,
            _id: data._id
        })
    });
     
}
   handleChange(e){

       console.log(e.target.value);
     const { name,value } = e.target;
     this.setState({
         [name]: value
     });
     
   }
   handleChangep(e){
       console.log(e.target)
    const name= e.target.name;

    if(e.target.name == "nombrep")
    {
        this.statep.nombrep= e.target.value;
    }
    if(e.target.name == "email")
    {
        this.statep.email= e.target.value;
    }
    if(e.target.name == "direccion")
    {
        this.statep.direccion= e.target.value;
    }
    if(e.target.name== "telefono")
    {
        this.statep.telefono= e.target.value;
    }
    if(e.target.name == "cedula")
    {
        this.statep.cedula= e.target.value;
    }

    
    console.log(this.statep);
    ;}
    
  

  

   

    render(){
        return (
            <div>
              {/**NAVIGATION */}
              <nav className="light-blue darken-4">
                  <div className="container">

                      <a className="brand-logo" href="/">Guarderia de Mascotas</a>
                  </div>
              </nav>

              

              <div style={{width:'95%'}}>
              
                  
                  <div className="row">
                      <div className="col s12">

                     
                      <div className="card">
                          <div className="card-content">
                              <form onSubmit={this.addTask}>

                                  <div className="row">

                                      <div className="col s6">

                                      <div className="input-field">
                                         <input style={{margin:'0px', height:'30px'}} name="title" onChange={this.handleChange} type="text" placeholder="nombre" 
                                         value={this.state.title}/>
                                       </div>
                                      
                                      <div className="input-field ">
                                         <textarea style={{margin:'0px', height:'30px'}} name="description" onChange={this.handleChange} placeholder="Caracteristicas fisicas"
                                          className="materialize-textarea"
                                          value={this.state.description}></textarea>
                                       </div>

                                       <div className="input-field ">
                                         <input name="raza" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text" placeholder="raza" 
                                         value={this.state.raza}/>
                                       </div>


                                       <div className="input-field">
                                              <input name="comportamiento" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text" placeholder="comportamiento" 
                                              value={this.state.comportamiento}/>
                                            </div>


                                            <div className="input-field ">
                                       <div>Fecha de nacimiento</div>
                                         <input name="nacimiento" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="date" 
                                         value={this.state.nacimiento}/>
                                       </div>

                                       <div className="input-field ">
                                         <input name="vacunas" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text"  placeholder="vacunas"
                                         value={this.state.vacunas}/>
                                       </div>


                                       </div>
                                       {/* columna2 */}

                                      <div className="col s6">

                                      
                                      <div className="input-field ">
                                         <input name="propietario" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text"  placeholder="propietario"
                                         value={this.state.propietario}/>
                                       </div>
                                       

                                       <div className="input-field">
                                         <input name="email" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="email"  placeholder="email del propietario"
                                         value={this.state.email}/>
                                       </div>

                                       <div className="input-field">
                                         <input name="direccion" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text"  placeholder="direccion del propietario"
                                         value={this.state.direccion}/>
                                       </div>
                                       <div className="input-field ">
                                         <input name="telefono" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text"  placeholder="telefono propietario"
                                         value={this.state.telefono}/>
                                       </div>
                                       <div className="input-field ">
                                         <input name="cedula" style={{margin:'0px', height:'30px'}} onChange={this.handleChange} type="text"  placeholder="cedula propietario"
                                         value={this.state.cedula}/>
                                       </div>


                                      </div>
                                  </div>
                             
                                       
                                  
                                  

                                  
                                       
                                  

                                  
                                      
                                  

                                  
                                  
                                  
                                 
                                       
                                       
                                            

                                       
                                            
                                       
                                        
                                       
                                       
                                  

                                       

                                       
                                     
                                  
                                  
                                  
                            


                                  <button type="submit" className="btn light-blue darken-4">
                                      Enviar
                                  </button>
                              </form>
                          </div>
                      </div>
                      </div>
                          
                      
                         
                          
                      
                          
                          
                          
                          <table style={{width:'100%'
                        
                        }}>

                              <thead>
                                  
                                  <tr>
                                      <th>Nombre</th>
                                      <th>Caracteristicas</th>
                                      <th>raza</th>
                                      <th>Comportamiento</th>
                                      <th>Fecha de nacimiento</th>
                                      <th>vacunas</th>
                                      <th>propietario</th>
                                      <th>email</th>
                                      <th>direccion</th>
                                      <th>telefono</th>
                                      <th>cedula</th>
                                  </tr>
                              </thead>
                              <tbody>

                        {
                               
                                   this.state.tasks.map(task => {
                                       return(
                                         <tr key={task._id}>
                                             <td >{task.title}</td>
                                             <td>{task.description}</td>
                                             <td>{task.raza}</td>
                                             <td>{task.comportamiento}</td>
                                             <td>{task.nacimiento}</td>
                                             <td>{task.vacunas}</td>
                                             <td>{task.propietario}</td>
                                             <td>{task.email}</td>
                                             <td>{task.direccion}</td>
                                             <td>{task.telefono}</td>
                                             <td>{task.cedula}</td>

                                             <td> 
                                                 <button className="btn light-blue darken-4"  onClick={()=> this.editTask(task._id)}>
                                                     <i className="material-icons">edit</i>
                                                     

                                                 </button>
                                                 <button onClick={()=> this.deleteTask(task._id)} className="btn light-blue darken-4" style={{margin:'4px'}}>
                                                 <i className="material-icons">delete</i>
                                                     
                                                 </button>
                                             </td>
                                         </tr>
                                       )
                                   })
                                  }
                              </tbody>
                          </table>
                                  
                                  </div>
                                  </div>
 </div>

)
}
}
  

export default App;
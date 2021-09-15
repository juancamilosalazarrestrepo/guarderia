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
           _id: ''
          
       }
        this.statep = {
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
         console.log(this.statep);
         
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
            this.setState({nombrep: '', email: '',direccion:'',telefono:'', cedula:''});
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
       alert("adtask");
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
               this.setState({title:'',description:'',_id:'',raza:'',comportamiento:'',nacimiento:'',vacunas:'',propietario:''});
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

              

              <div className="container">
              
                  
                  <div className="row">
                      <div className="col s10">

                     
                      <div className="card">
                          <div className="card-content">
                              <form onSubmit={this.addTask}>
                              <div className="row">
                                       <div className="input-field col s12">
                                         <input name="title" onChange={this.handleChange} type="text" placeholder="nombre" 
                                         value={this.state.title}/>
                                       </div>
                                  </div>  
                                  

                                  <div className="row">
                                       <div className="input-field col s12">
                                         <textarea  name="description" onChange={this.handleChange} placeholder="Caracteristicas fisicas"
                                          className="materialize-textarea"
                                          value={this.state.description}></textarea>
                                       </div>
                                  </div>

                                  <div className="row">
                                       <div className="input-field col s12">
                                         <input name="raza" onChange={this.handleChange} type="text" placeholder="raza" 
                                         value={this.state.raza}/>
                                       </div>
                                  </div>

                                  
                                  
                                  
                                  <div className="row">
                                       
                                       <div className="input-field col s12">
                                              <input name="comportamiento" onChange={this.handleChange} type="text" placeholder="comportamiento" 
                                              value={this.state.comportamiento}/>
                                            </div>
                                            

                                       
                                            
                                       </div>

                                       <div className="input-field col s12">
                                         <input name="nacimiento" onChange={this.handleChange} type="date" 
                                         value={this.state.nacimiento}/>
                                       </div>
                                       
                                  <div className="input-field col s12">
                                         <input name="vacunas" onChange={this.handleChange} type="text"  placeholder="vacunas"
                                         value={this.state.vacunas}/>
                                       </div>

                                       <div className="input-field col s12">
                                         <input name="propietario" onChange={this.handleChange} type="text"  placeholder="propietario"
                                         value={this.state.propietario}/>
                                       </div>

                                  
                                  
                                  
                            


                                  <button type="submit" className="btn light-blue darken-4">
                                      Enviar
                                  </button>
                              </form>
                          </div>
                      </div>
                      </div>
                          
                      
                         
                          
                      
                          
                          
                          
                          <table>

                              <thead>
                                  <tr>Perros en la guarderia</tr>
                                  <tr>
                                      <th>Nombre</th>
                                      <th>Caracteristicas</th>
                                      <th>raza</th>
                                      <th>Comportamiento</th>
                                      <th>Fecha de nacimiento</th>
                                      <th>vacunas</th>
                                      <th>propietario</th>
                                  </tr>
                              </thead>
                              <tbody>

                        {
                               
                                   this.state.tasks.map(task => {
                                       return(
                                         <tr key={task._id}>
                                             <td>{task.title}</td>
                                             <td>{task.description}</td>
                                             <td>{task.raza}</td>
                                             <td>{task.comportamiento}</td>
                                             <td>{task.nacimiento}</td>
                                             <td>{task.vacunas}</td>
                                             <td>{task.propietario}</td>

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
{/* formulario personas */}
                
 <div style={{
    backgroundColor: '#ffffff',
    width:'100%',
    
    }}>

       {/* contenido formulario personas */}
    <form onSubmit={this.addPersona} style={{
        width:'30%',
        marginLeft:'5%',
        
        }}>
  <div className="row" style={{
      display:'flex',
      width:'100%',
      height:'500px',
      justifyContent:'space-between'
      }}>          
    <div className="col 4">       
    <div className="card">
      <div className="card-content">
         <input  type="text" name="nombrep"
        onChange={this.handleChangep}
        
         
           placeholder="nombre propietario"
           
           
           style={{
               margin:'10px',
               width:'500px'
           }}/>
           <input  type="email" name="email"
           
          
           onChange={this.handleChangep}
           
           
           style={{
               margin:'10px',
               width:'500px'
           }}/>
           <input  type="text" name="direccion"
           placeholder="direccion del propietario"
           onChange={this.handleChangep}
          
           style={{
               margin:'10px',
               width:'500px'
           }}/>
           <input  type="text" name="telefono"
           placeholder="telefono propietario"
           onChange={this.handleChangep}
           
           
           
           style={{
               margin:'10px',
               width:'500px'
           }}/>
           <input  type="text" name="cedula"
           placeholder="cedula del propietario"
           onChange={this.handleChangep}
           
           
           style={{
               margin:'10px',
               width:'500px'
           }}/>
           
           <button type="submit" className="btn light-blue darken-4" style={{margin:'15px'}}>
      Enviar
        </button>

       </div>    
     </div>    
     </div>
    
     
    </div> 

    
    </form>

    <div style={{
        width:'90%',
        margin:'50px'
}}>

    <table>

<thead>
    <tr>propietarios de Perros en la guarderia</tr>
    <tr>
        <th>Nombre persona</th>
        <th>email</th>
        <th>dieccion</th>
        <th>Telefono</th>
        <th>cedula</th>
        
    </tr>
</thead>
<tbody>
{this.fetchPersonas()}
    <td>{this.state.tasks.length}</td>
    
    <td>{this.statep.personas.length}</td>
    
    <td>tttt</td>
    
    <td>tttt</td>
    
    <td>tttt</td>
{/* {
  
   this.statep.personas.map(persona => {
    
    return(
      <tr key={persona._id}>
          <td>{persona.nombrep}</td>
          <td>{persona.email}</td>
          <td>{persona.direccion}</td>
          <td>{persona.telefono}</td>
          <td>{persona.cedula}</td>
          

        
      </tr>
    )
})

  

} */}

    
   
    
    
</tbody>
</table>


    </div>


    <div className="contenedor1">
       
    feliz
    </div>
    
    


    
    
</div> 
                  

                  
            </div>
        )
    }
}

export default App;
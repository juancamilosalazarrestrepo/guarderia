import React, {Component} from "react";


class App extends Component {

   constructor() {
       super();
       this.state = {
           title:'',
           description: '',
           raza:'',
           tasks:[],
           _id: ''
       };
       this.handleChange = this.handleChange.bind(this);
       this.addTask = this.addTask.bind(this);
   }

   addTask(e){
       
       if(this.state._id){
           fetch(`/api/tasks/${this.stage._id}`,{
               
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
               this.setState({title:'',description:'',_id:'',raza:''});
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
            this.setState({title: '', description: '',raza:''});
            this.fetchTasks();
        })
        .catch(err => console.error(err));
       }
        
       e.preventDefault();
   }

   componentDidMount(){
      this.fetchTasks();
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
            _id: data._id
        })
    });
     
}
   handleChange(e){
     const { name,value } = e.target;
     this.setState({
         [name]: value
     });
     
   }

   
   
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
                      <div className="col s5">
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

                                  <button type="submit" className="btn light-blue darken-4">
                                      Enviar
                                  </button>
                              </form>
                          </div>
                      </div>
                      </div>
                      <div className="col s7">
                          <table>

                              <thead>
                                  <tr>
                                      <th>Nombre</th>
                                      <th>Caracteristicas</th>
                                      <th>raza</th>
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
            </div>
        )
    }
}

export default App;
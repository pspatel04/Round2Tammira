import React from 'react';
import ReactDOM from "react-dom"
import './App.css';
import { Button,Modal } from 'react-bootstrap'




class App extends React.Component {
constructor(props) {

  super(props);

  this.state = {
      items: [],
      isLoaded: false,
      showModal : false,
  }

  this.addPost = this.addPost.bind(this);

  
 

}

addPost(e)

  {
    
  if(this._inputTitle.value && this._inputDes.value )
  {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      userId: 1,
      title: this._inputTitle.value,
      body: this._inputDes.value,
    
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    this.setState((prevState) => {
      return { 
      items: prevState.items.concat(json)  
      };
    });
    this._inputTitle.value = "";
    this._inputDes.value = "";
    this.closeModal()
  
  })

  }
  else
  {
    alert('Please enter title and description.')
  }
  console.log(this.state.items);
  e.preventDefault();
}

 
openModal() {
  this.setState({
    showModal:true
  });
}

closeModal() {
  this.setState({
    showModal:false
  });
}

/**
* componentDidMount
*
* Fetch json array of objects from given url and update state.
*/
componentDidMount() {

  fetch('https://jsonplaceholder.typicode.com/posts/?_limit=10')
      .then(res => res.json())
      .then(json => {
          this.setState({
              items: json,
              isLoaded: true, 
          })
      }).catch((err) => {
          console.log(err);
      });

}



render ()
{
return (


  <div className="app-card-list">
   <div className="col-xs-6">
   <h1 className="App-header">MY POSTS</h1>
   {this.state.items.map((item) => (
     <div className="card" key ={item.id}>
       <div className="card-body">
         <h5 className="card-title" >Title :{item.title}</h5>
         <h6 className="card-subtitle mb-2 text-muted">
           <b>Description:</b>
         { item.body
         }            
         </h6>
       </div>
     </div>
   ))}
   </div>

   <div className="addpost" >
     <Button className="button" variant="primary" onClick={e => this.openModal(e)}>Add Post</Button>
   </div>



   <div className="App">
   <Modal show={this.state.showModal} handleClose={e => this.closeModal(e)}>
          
          <Modal.Header closeButton onClick={() => this.closeModal()}>
          <Modal.Title>Add Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <label>Title:</label>
            <input ref={(a) => this._inputTitle =a}
              type="text"
              className="form-control required"
            />
            <label>Description:</label>
            <input ref={(a) => this._inputDes =a}
              type="text"
              className="form-control required"
            />
            </Modal.Body>
          

          <div className="form-group">
            
            <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.closeModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick= {this.addPost} onSubmit={e => this.closeModal(e)}>
              Post
            </Button>
                    </Modal.Footer>
          </div>
        </Modal>
        </div>
        </div>
  
  
);

}

}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
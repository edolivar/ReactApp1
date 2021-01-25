import React, { Component } from 'react'
import axios from 'axios';
import Table from './Table' 
import Form from './Form'; 

class App extends Component {
    state = {
        characters: []
      }

      makeDeleteCall(character){
        console.log(character)
        return axios.delete('http://localhost:5000/users', {data: character})
        .then(function (response) {
          console.log(response);
          return (response);
        })
        .catch(function (error) {
          console.log('axios err', error.response)
          return false
         });
      }

      removeCharacter = index => {
        const { characters } = this.state
        let character = {...characters[index]}
        this.makeDeleteCall(character).then(callResult => {
            if(callResult.status === 204){
              this.setState({
                characters: characters.filter((character, i) => {
                  return i !== index
                }),
              })
            }
          })
      }

      makePostCall(character){
        return axios.post('http://localhost:5000/users', character)
         .then(function (response) {
           console.log(response);
           return (response);
         })
         .catch(function (error) {
           console.log(error);
           return false;
         });
      }

      handleSubmit = character => {
        this.makePostCall(character).then( callResult => {
           if (callResult.status === 201) {
              this.setState({ characters: [...this.state.characters, callResult.data] });
              console.log(callResult.data)
           }
        });
      }

      componentDidMount() {
        axios.get('http://localhost:5000/users')
         .then(res => {
           const characters = res.data.users_list;
           this.setState({ characters });
         })
         .catch(function (error) {
           //Not handling the error. Just logging into the console.
           console.log(error);
         });
     }

    render() {  
      const { characters } = this.state
      return (
        <div className="container">
            <Table 
            characterData={characters}
            removeCharacter={this.removeCharacter} />
            <Form
            handleSubmit={this.handleSubmit} />
        </div>
      )
    }
  }

export default App
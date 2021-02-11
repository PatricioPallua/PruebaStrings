import { useState } from "react";
import Axios from "axios";
import './App.css';

function App() {

  const [input, setInput] = useState("")
  const [responses, setResponses] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(input === ""){
      alert("No puede enviar contenido vacio")
    } else {
      var body = { input: input }
      Axios.post("http://localhost:3001/", body)
        .then(response => {
          var newResponses = [...responses, response.data]
          setResponses(newResponses)
        })
    }
    setInput("")
  }

  return (
    <div className="App">
      Hola DevLights
      <form className="form">
        <label> Input <br/>
          <input className="input" type="text" name="input" value={input} onChange={(e) => setInput(e.target.value)} />  
        </label>
        <button onClick={handleSubmit}> SUBMIT </button>
      </form>
      {
        responses.length === 0 ? 
          <div> Todavia no se realizaron consultas </div>
          :
          <div className="tableContainer">
            <table>
              <tr>
                <th> FECHA </th>
                <th> INPUT </th>
                <th> OUTPUT </th>
                <th> VALID </th>
              </tr>  
              <tbody>
              {
                responses.map((el) => {
                  return(
                    <tr key={el.date}>
                      <td> {el.date} </td>
                      <td> {el.input} </td>
                      <td> {el.output} </td>
                      <td> {el.valid} </td>
                    </tr>    
                  )         
                })
              }
              </tbody>
            </table>
          </div>

      }
    </div>
  );
}

export default App;

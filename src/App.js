import './App.css';
import { useState } from 'react';
import http from 'axios'

function App() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const signUp = async () => {
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: nameValue,
        password: passwordValue
      })
      alert("Succesful signup")
      setNameValue('')
      setPasswordValue('')
    } catch (err) {
      console.log(err.response)
      if (!err.response) {
        alert("Oops... Something went wrong")
      }
      if (err.response.status === 409) {
        alert('Username already exists')
      }
      if (err.response.status === 400) {
        alert('Missing credentials')
      }
    }
  }

  return (
    <div className="App">
      <h1>Registration</h1>
      <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
      <button onClick={signUp}>Sign up</button>
    </div>
  );
}

export default App;

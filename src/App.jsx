import './App.css';
import { useState } from 'react';
import http from 'axios'

function App() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [authUser, setAuthUser] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [todo, setTodo] = useState('');

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

  const addTodo = async () => {
    try {
      await http.post('http://localhost:4000/api/todo', {
        todo: todo
      }, {
        headers: {
          authorization: authUser+':::'+authPassword
        }
      })
      alert("Todo added")
      setTodo('')
    } catch (err) {
      alert('Ooop... Something went wrong')
    }
  }

  return (
    <main>
      <section className="App">
        <h1>Registration</h1>
        <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
        <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
        <button onClick={signUp}>Sign up</button>
      </section>
      <section>
        <h1>Todos</h1>
        <input type="text" placeholder="username" value={authUser} onChange={(e) => setAuthUser(e.target.value)}/>
        <input type="password" placeholder="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}/>
        <input type='text' placeholder='todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={addTodo} disabled={!todo}>Add todo</button>
      </section>
    </main>
  );
}

export default App;

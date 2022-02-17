import './App.css';
import { useEffect, useState } from 'react';
import http from 'axios'

function App() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [authUser, setAuthUser] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [todo, setTodo] = useState('');

  const [sectionToAppear, setSectionToAppear] = useState('registration')

  const signUp = async () => {
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: nameValue,
        password: passwordValue
      })
      alert("Succesful signup")
      setSectionToAppear('login')
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

  const login = async () => {
    try {
      await http.post('http://localhost:4000/api/login', {

    }, {
        headers: {
          authorization: authUser+':::'+authPassword
        }
      })
      console.log(authUser, authPassword);
      setSectionToAppear('todos')
      localStorage.setItem('user', authUser)
      localStorage.setItem('password', authPassword)

    } catch (err) {
      alert('Wrong username or password')
    }
  }

  const signOut = () => {
    localStorage.removeItem('user', authUser)
    localStorage.removeItem('password', authPassword)

    setAuthUser('')
    setAuthPassword('')
    setSectionToAppear('login')
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    const password = localStorage.getItem('password')
    if (!user || !password) return;
    setAuthUser(user)
    setAuthPassword(password)
    setSectionToAppear('todos')
  }, [])

  return (
    <main>

      {sectionToAppear === 'registration' && <section>
        <h1>Registration</h1>
        <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
        <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
        <button onClick={signUp}>Sign up</button>
        <button onClick={() => setSectionToAppear('login')}>I already have an account</button>
      </section>}    

      {sectionToAppear === 'login' && <section>
        <h1>Login</h1>
        <input type="text" placeholder="authUsername" value={authUser} onChange={(e) => setAuthUser(e.target.value)}/>
        <input type="password" placeholder="authPassword" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}/>
        <button onClick={() => setSectionToAppear('registration')}>I don't have an account</button>
        <button onClick={login}>Log in</button>
      </section>}

      {sectionToAppear === 'todos' && <section>
        <h1>Todos</h1>
        <input type='text' placeholder='todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={addTodo} disabled={!todo}>Add todo</button>
        <button onClick={signOut}>Sign out</button>
      </section>}
      
    </main>
  );
}

export default App;

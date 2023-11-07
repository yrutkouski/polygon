import {useRef, useState, useContext} from 'react';
import {UserContext} from '../context';

const FORM_ACTION = {
  LOGIN: 'login',
  SIGNUP: 'signup'
}

export const Login = () => {
  const [, setUser] = useContext(UserContext);
  const [error, setError] = useState('');
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const clearError = () => {
    if (error) setError('');
  };

  const handleSubmit = action => e => {
    e.preventDefault();

    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    const users = JSON.parse(localStorage.getItem('users'));

    switch(action) {
      case FORM_ACTION.LOGIN: {
        const matchedUser = users.find(user => user.username === username && user.password === password);

        if (matchedUser) {
          sessionStorage.setItem('current_user', JSON.stringify(matchedUser));
          setUser(matchedUser);
        } else {
          setError('invalid username/password or user not found');
        }
        break;
      }
      case FORM_ACTION.SIGNUP: {
        const newUser = {username, password};

        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        sessionStorage.setItem('current_user', JSON.stringify(newUser));
        setUser(newUser);
        break;
      }
      default: {
        throw Error('Invalid action: ' + action);
      }
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h1>Login</h1>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          ref={el => usernameInputRef.current = el}
          onFocus={clearError}
        />
      </label>
      <label htmlFor="password">
        Username:
        <input
          type="password"
          name="password"
          ref={el => passwordInputRef.current = el}
          onFocus={clearError}
        />
      </label>
      <button type="submit" onClick={handleSubmit(FORM_ACTION.LOGIN)}>Login</button>
      <button type="submit" onClick={handleSubmit(FORM_ACTION.SIGNUP)}>Sign up</button>
      {!!error && (<p>{error}</p>)}
    </form>
  )
}

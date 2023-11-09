import { useContext, useState, useRef } from 'react';
import { UserContext } from '../../utils/context';
import { useUser } from '../../utils/hooks';

export const FORM_ACTION = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

const useLoginHandlers = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  const { logUser, saveUser, users } = useUser();

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const clearError = () => {
    if (error) setError('');
  };

  const handleSubmit = (action) => () => {
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!(username || password)) {
      setError('Empty username/password');
      return;
    }

    const matchedUser = users.find(
      (user) => user.username === username,
    );

    switch (action) {
      case FORM_ACTION.LOGIN: {
        if (matchedUser) {
          logUser(matchedUser);
          setUser(matchedUser);
        } else {
          setError('Invalid username/password or user not found');
        }
        break;
      }
      case FORM_ACTION.SIGNUP: {
        const newUser = { username, password };

        if (matchedUser) {
          setError('User already exists');
        } else {
          saveUser([...users, newUser]);
          logUser(newUser);
          setUser(newUser);
        }
        break;
      }
      default: {
        console.error(`Invalid action: ${action}`);
      }
    }
  };

  return {
    usernameInputRef,
    passwordInputRef,
    handleSubmit,
    error,
    clearError,
  };
};
export default useLoginHandlers;

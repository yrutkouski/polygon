import React from 'react';
import useLoginHandlers, { FORM_ACTION } from './useLoginHandlers';
import './login.css';

const Login = () => {
  const {
    usernameInputRef,
    passwordInputRef,
    handleSubmit,
    error,
    clearError,
  } = useLoginHandlers();

  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <h1>Login</h1>
      <label className="login-form__input" htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          ref={(el) => { usernameInputRef.current = el; }}
          onFocus={clearError}
        />
      </label>
      <label className="login-form__input" htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          ref={(el) => { passwordInputRef.current = el; }}
          onFocus={clearError}
        />
      </label>
      <div className="login-form__buttons-wrapper">
        <button type="button" onClick={handleSubmit(FORM_ACTION.LOGIN)}>Login</button>
        <button type="button" onClick={handleSubmit(FORM_ACTION.SIGNUP)}>Sign up</button>
      </div>
      {!!error && (<p className="login-form__error-message">{error}</p>)}
    </form>
  );
};

export default Login;

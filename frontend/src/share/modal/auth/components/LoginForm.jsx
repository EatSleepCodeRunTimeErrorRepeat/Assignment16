import { Box, Link, TextField, Typography } from '@mui/material';
import React, { useDebugValue, useState } from 'react';
import Axios from '../../../AxiosInstance';
import { AxiosError } from 'axios';

const LoginForm = ({ handleClose = () => {}, setIsLogin = () => {}, setStatus = () => {}, setUser = () => {} }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [usernameOrEmailError, setUsernameOrEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    if (!usernameOrEmail) {
      setUsernameOrEmailError('Username or email is required');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    return isValid;
  };
  const loginMutation = useMutation(() =>
  Axios.post('/login', { usernameOrEmail, password })
);

const handleSubmit = async () => {
  if (!validateForm()) return;
  loginMutation.mutate();
};

loginMutation.isSuccess &&
  setUser({
    username: loginMutation.data.data.username,
    email: loginMutation.data.data.email,
  });

loginMutation.isSuccess &&
  handleClose() &&
  setStatus({ msg: loginMutation.data.msg, severity: 'success' });

loginMutation.isError &&
  setUsernameOrEmail('') &&
  setPassword('') &&
  (loginMutation.error instanceof AxiosError
    ? loginMutation.error.response
      ? setStatus({
          msg: loginMutation.error.response.data.error,
          severity: 'error',
        })
      : setStatus({
          msg: loginMutation.error.message,
          severity: 'error',
        })
    : setStatus({ 
      msg: loginMutation.error.message, 
      severity: 'error' 
    }));
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 4,
      }}
    >
      <Typography fontSize="1.25rem" fontWeight="400">
        CSC105 integration!
      </Typography>
      <Typography fontSize="2.5rem" fontWeight="700">
        Login
      </Typography>
      <TextField
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        fullWidth
        error={usernameOrEmailError !== ''}
        helperText={usernameOrEmailError}
        label="Username or Email"
        placeholder="Type your username or email"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        error={passwordError !== ''}
        helperText={passwordError}
        label="Password"
        type="password"
        placeholder="Type your password"
      />
      <Link color="#999999" sx={{ alignSelf: 'end', cursor: 'pointer' }} onClick={() => setIsLogin(false)}>
        No account?
      </Link>
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '.25rem',
          fontSize: '1.5rem',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(90deg, black 50%, white 50%)',
          backgroundSize: '200% 100%',
          backgroundPosition: '100% 0%',
          transition: 'all .2s ease-in-out',
        }}
        onMouseOver={(e) => {
          e.target.style.color = 'white';
          e.target.style.backgroundPosition = '0% 0%';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = 'black';
          e.target.style.backgroundPosition = '100% 0%';
        }}
      >
        Login
      </button>
    </Box>
  );
};

export default LoginForm;

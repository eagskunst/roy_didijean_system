import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { useLogin } from './useLogin';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { username, setUsername, password, setPassword, signIn } = useLogin();

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Nombre de usuario"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={signIn} sx={{ mt: 4 }}>
        Iniciar Sesión
      </LoadingButton>
    </>
  );
}

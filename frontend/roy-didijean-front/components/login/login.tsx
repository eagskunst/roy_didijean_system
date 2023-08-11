import React from 'react'
import LockIcon from '@mui/icons-material/Lock'
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  Button
} from '@mui/material'
import { useLogin } from './useLogin'

export const Login = () => {
  const { username, setUsername, password, setPassword, signIn } = useLogin()
  return (
    <Stack direction='column' alignItems='center'>
      <Avatar
        sx={{
          marginTop: '4rem'
        }}
      >
        <LockIcon />
      </Avatar>
      <Typography variant='h5'>Sign In </Typography>
      <Box component='form'>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='username'>Usuario</InputLabel>
          <OutlinedInput
            label='Usuario'
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value)
            }}
          />
        </FormControl>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password'>Contraseña</InputLabel>
          <OutlinedInput
            label='Contraseña'
            type='password'
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        </FormControl>
        <Button
          onClick={signIn}
          variant='contained'
          fullWidth
          sx={{
            marginTop: '3rem'
          }}
        >
          Sign In
        </Button>
      </Box>
    </Stack>
  )
}

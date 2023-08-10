import React, { useState } from 'react'
const url = process.env.NEXT_PUBLIC_API_URL
export const useLogin = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signIn = async () => {
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok) {
        return data
      }
      throw new Error(data.message)
    } catch (error) {
      return {}
    }
  }

  return { username, password, setUsername, setPassword, signIn }
}

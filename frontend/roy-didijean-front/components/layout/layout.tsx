import React from 'react'
import { ILayoutComponent } from '@components/layout/types'
import Box from '@mui/material/Box'

export const Layout = ({ children }: ILayoutComponent) => {
  return <Box>{children}</Box>
}

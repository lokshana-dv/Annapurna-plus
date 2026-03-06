import React from 'react'
import { AppProvider } from './context/AppContext'
import AppShell from './App'

export default function Root() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}

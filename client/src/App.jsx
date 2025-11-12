import { useState } from 'react'
import Users from './modules/users/Users'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="apple-navbar">
          <h1>SGU</h1>
        </div>
        <div className="container apple-header-content">
          <h2 className="apple-title">Sistema de Gestión de Usuarios</h2>
          <p className="subtitle">Administra usuarios de forma moderna y eficiente</p>
        </div>
      </header>
      <main>
        <div className="container apple-main-content">
          <Users />
        </div>
      </main>
    </div>
  )
}

export default App

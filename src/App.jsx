import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar';
import { ProfileSelector } from './components/ProfileSelector';
import { MatchesList } from './components/MatchesList';

function App() {
  

  return (
    <>
      <Navbar/>
      {/* <ProfileSelector/> */}
      <MatchesList/>
    </>
  )

  //npm install -D stores dependencies into Devdependencies
}

export default App

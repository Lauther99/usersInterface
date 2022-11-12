import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ListUsers from './components/ListUsers'
import useApi from './hooks/useApi'

function App() {

  const[data, getData] = useApi([])
  const[selectedUser, setSelectedUser] = useState(null)

  const selectUser = (user) => {
    setSelectedUser(user)
  }

  const unSelectUser = () => {
    setSelectedUser(null)
  }
  return (
    <>
        <Header getData={getData} selectedUser={selectedUser} unSelectUser={unSelectUser}/>
        <ListUsers data={data} selectUser={selectUser} />
    </>
  )
}

export default App

import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import UnfilledList from './components/UnfilledList'
import useApi from './hooks/useApi'
import ListUsers from './components/ListUsers'


function App() {

  const[data, getData] = useApi([])
  const[selectedUser, setSelectedUser] = useState(null)

  const selectUser = (user) => {
    setSelectedUser(user)
  }

  const unSelectUser = () => {
    setSelectedUser(null)
  }

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(getData())
    .catch(error => console.log(error))
  }

 function showList(){
  if (data.length > 0) {
    return (<ListUsers data={data} selectUser={selectUser} deleteUser={deleteUser}/>)
  } else {
    return (<UnfilledList />)
  }
 }


  return (
    <>
        <Header getData={getData} selectedUser={selectedUser} unSelectUser={unSelectUser}/>
        {showList()}
        

    </>
  )
}

export default App

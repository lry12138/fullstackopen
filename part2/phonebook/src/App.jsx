import { useState } from 'react'
import Filtered from './components/Filtered'
import AddNew from './components/AddNew'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [userFilter, setuserFilter] = useState('')

  const handleChangeName = (event)=>{
    setNewName(event.target.value)
  }

  const handleChangePhone =  (event)=>{
    setnewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setuserFilter(event.target.value)
  }
    
  const addPerson = (event) => {
    event.preventDefault()
    var existance = persons.find(({ name }) => name === newName)
    if (existance !== undefined) {
      alert('${newName} is already added to phonebook')
    } 
    else {
    const newPerson = {
      id: persons.length+1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setnewNumber('')
    }
  }

  const filterPerson = (person) =>{
    return person.name.toLowerCase().includes(userFilter.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm userFilter={userFilter} handleFilter={handleFilter} />

      <h2>Add new</h2>
      <AddNew addPerson={addPerson} newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}/>
      
      <h2>Numbers</h2>
      <Filtered arr={persons}  filterArr ={filterPerson}/>
    </div>
  )
}

export default App